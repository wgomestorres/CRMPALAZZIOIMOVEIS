import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.properties.findIndex((p: any) => p.id === id);
  if (index !== -1) {
    db.properties[index] = { ...db.properties[index], ...body };
    writeDB(db);
    return NextResponse.json(db.properties[index]);
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDB();
  db.properties = db.properties.filter((p: any) => p.id !== id);
  writeDB(db);
  return NextResponse.json({ success: true });
}
