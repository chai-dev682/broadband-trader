import { authenticate, NotAuthenticated } from '@/app/lib/authenticater';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  // This end point is to test if user is authenticated or not
  const user = await authenticate(req);
  if (!user) return NotAuthenticated();

  // If authenticated, you can include user data in the response
  return NextResponse.json({ message: 'Hello', user }, { status: 200 });
}
