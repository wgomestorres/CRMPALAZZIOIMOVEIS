import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.properties);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDB();
  const newProperty = {
    ...body,
    id: uuidv4(),
    image: body.image || `https://picsum.photos/seed/${uuidv4()}/600/400`
  };
  db.properties.push(newProperty);
  writeDB(db);
  return NextResponse.json(newProperty);
}
