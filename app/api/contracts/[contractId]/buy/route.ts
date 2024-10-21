import { authenticate, NotAuthenticated } from '@/app/lib/authenticater';
import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await authenticate(req);
    if (!user) return NotAuthenticated();
    const parts = req.url.split('/');

    const userId = user.sub; // id of user who is buying contract
    const contractId = parts[parts.length - 1]; //the contract id which is being bought

    //TODO handle buying here @william
    //you can use userId and contractId that is received from frontend

    return new Response(
      JSON.stringify({
        method: 'buying contract',
        status: 'under development',
        userId,
        contractId
      }),
      {
        status: 201
      }
    );
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
