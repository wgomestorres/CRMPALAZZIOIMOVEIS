import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const db = readDB();
  const user = db.users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    const response = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
    response.cookies.set('auth_token', 'dummy_token', { httpOnly: true, path: '/' });
    return response;
  }
  
  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
