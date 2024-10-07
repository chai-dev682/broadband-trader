import admin from '@/app/lib/firebase-admin';
import { Collections } from '@/constants/firebase';

export async function POST(req: Request) {
  // todo: handle user authentication
  try {
    const {
      contract_id,
      sell_date,
      internet_speed,
      network_bandwidth_from_isp,
      country,
      asking_price,
      sku,
      order_number,
      order_date
    } = await req.json();
    const db = admin.firestore();
    await db.collection(Collections.NOTES).doc().create({
      contract_id,
      sell_date
    });

    // .set({
    //   firstname,
    //   lastname,
    //   phone,
    //   email,
    //   password: hashedPassword,
    //   createdAt: admin.firestore.FieldValue.serverTimestamp()
    // });

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
