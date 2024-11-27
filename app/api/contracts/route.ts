import { authenticate, NotAuthenticated } from '@/app/lib/authenticater';
import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';
import { NextRequest } from 'next/server';
import contractABI, { contractAddress } from '@/contracts/contractABI';
import { ethers } from 'ethers';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 2); // default to 10 results per page
    const lastVisible = searchParams.get('lastVisible'); // get the last visible document ID from query

    const db = admin.firestore();
    let query = db.collection(Collections.CONTRACTS).limit(limit);

    if (lastVisible) {
      const lastDocSnapshot = await db
        .collection(Collections.CONTRACTS)
        .doc(lastVisible)
        .get();
      if (lastDocSnapshot.exists) {
        query = query.startAfter(lastDocSnapshot);
      }
    }

    const contractsSnapshots = await query.get();
    const contracts = contractsSnapshots.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));

    const lastDoc = contractsSnapshots.docs[contractsSnapshots.docs.length - 1];
    const nextPageToken = lastDoc ? lastDoc.id : null; // if there's a next page, return the last doc ID

    return new Response(JSON.stringify(contracts), {
      status: 201
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'An unexpected error occurred' }),
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  // todo: handle user authentication
  try {
    const user = await authenticate(req);
    if (!user) return NotAuthenticated();

    const {
      term,
      monthlyFee,
      capacity,
      usage,
      askingPrice,
      maintenanceCost,
      account
    } = await req.json();
    const db = admin.firestore();

    const remainingPayments = term; //initally all payments are remaining or might be term-1 (todo)

    //start creating new contract
    const newContractRef = db.collection(Collections.CONTRACTS).doc(); // Create a new document reference
    // const newNoteRef = db.collection(Collections.NOTES).doc();

    // const newNoteData = {
    //   ...note,
    //   usage: 0,
    //   owner: user.sub
    // };

    // await newNoteRef.set(newNoteData);
    // Create the document in Firestore
    // const createdNote = await newNoteRef.get();

    const newContractData = {
      term,
      monthlyFee,
      price: 0,
      capacity,
      usage,
      askingPrice,
      maintenanceCost,
      owner: user.sub,
      remainingPayments,
      status: 'active',
      lastMaintenancePayment: admin.firestore.FieldValue.serverTimestamp(),
      remainingContractValue: remainingPayments * monthlyFee
      // notes: [createdNote.id]
    };

    await newContractRef.set(newContractData);

    // Retrieve the newly created contract (with the auto-generated ID)
    const createdContract = await newContractRef.get();

    console.log('contract create at firestore');

    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_ENDPOINT);
    if (process.env.PRIVATE_KEY) {
      const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      console.log(signer.address);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const contractWithSigner = contract.connect(signer);
      console.log('Calling list contract function...');
      const transactionResponse = await contractWithSigner.listContract(
        askingPrice,
        capacity,
        monthlyFee,
        maintenanceCost,
        remainingPayments,
        account
      );
      console.log(`Transaction hash: ${transactionResponse.hash}`);

      return new Response(
        JSON.stringify({ ...createdContract.data(), id: newContractRef.id }),
        {
          status: 201
        }
      );
    } else {
      throw new Error('private key is not defined');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating new user:', error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400
      });
    } else {
      // console.error('Unexpected error:', error);
      return new Response(
        JSON.stringify({ error: 'An unexpected error occurred' }),
        { status: 500 }
      );
    }
  }
}
