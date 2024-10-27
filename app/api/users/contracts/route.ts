import { authenticate, NotAuthenticated } from '@/app/lib/authenticater';
import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await authenticate(req);
    if (!user) return NotAuthenticated();
    const { searchParams } = new URL(req.url);
    const lastVisible = searchParams.get('lastVisible'); // get the last visible document ID from query

    const db = admin.firestore();
    let query = db
      .collection(Collections.CONTRACTS)
      .where('owner', '==', user.sub);

    // if (lastVisible) {
    //   const lastDocSnapshot = await db
    //     .collection(Collections.CONTRACTS)
    //     .doc(lastVisible)
    //     .get();
    //   if (lastDocSnapshot.exists) {
    //     query = query.startAfter(lastDocSnapshot);
    //   }
    // }

    const contractsSnapshots = await query.get();
    const contracts = contractsSnapshots.docs.map((item) => ({
      id: item.id,
      isOwner: item.id == user.sub,
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
