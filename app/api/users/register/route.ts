import admin from '@/app/lib/firebase-admin';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password, firstname, lastname, phone } = await req.json();

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    const hashedPassword = await bcrypt.hash(password, process.env.SALT || 10);

    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      firstname,
      lastname,
      phone,
      email,
      password: hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return new Response(JSON.stringify({ uid: userRecord.uid }), {
      status: 201
    });
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
