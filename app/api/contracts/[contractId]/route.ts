import { authenticate, NotAuthenticated } from '@/app/lib/authenticater';
import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const parts = req.url.split('/');
    const contractId = parts[parts.length - 1];
    const db = admin.firestore();
    let query = db.collection(Collections.CONTRACTS).doc(contractId);

    const contractsSnapshot = await query.get();
    const contracts = contractsSnapshot.data();
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
