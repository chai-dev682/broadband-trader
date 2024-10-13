import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';

export async function POST(req: Request) {
  // todo: handle user authentication
  try {
    const {
      term,
      monthlyFee,
      price,
      capacity,
      usage,
      askingPrice,
      maintenanceCost
    } = await req.json();
    const db = admin.firestore();

    const remainingPayments = term; //initally all payments are remaining or might be term-1 (todo)

    //start creating new contract
    const newContractRef = db.collection(Collections.CONTRACTS).doc(); // Create a new document reference

    const newContractData = {
      term,
      monthlyFee,
      price,
      capacity,
      usage,
      askingPrice,
      maintenanceCost,
      owner: 'Dummy Owner',
      remainingPayments,
      status: 'active',
      lastMaintenancePayment: admin.firestore.FieldValue.serverTimestamp(),
      remainingContractValue: remainingPayments * monthlyFee
    };

    // Create the document in Firestore
    await newContractRef.set(newContractData);

    // Retrieve the newly created contract (with the auto-generated ID)
    const createdContract = await newContractRef.get();

    return new Response(
      JSON.stringify({ ...createdContract.data(), id: newContractRef.id }),
      {
        status: 201
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      // console.error('Error creating new user:', error.message);
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
