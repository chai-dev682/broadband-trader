import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const NotAuthenticated = async () => {
  return NextResponse.json(
    { message: 'User not Authenticated!' },
    { status: 401 }
  );
};

const authenticate = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return null;
  return token;
};

export { NotAuthenticated, authenticate };
