import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';
import { User } from '@/types/database';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const db = admin.firestore();
    const userSnapshot = await db
      .collection(Collections.USERS)
      .where('email', '==', email)
      .get();

    // console.log(email, password);
    // console.log(userDoc);
    // console.log(userDoc.data());
    if (userSnapshot.empty) {
      return new Response(JSON.stringify({ error: 'User not found!' }), {
        status: 404
      });
    }

    const userDoc = userSnapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() } as User;
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid Password!' }), {
        status: 401
      });
    }
    console.log(process.env.NEXTAUTH_SECRET);

    return new Response(JSON.stringify(user), { status: 200 });
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
