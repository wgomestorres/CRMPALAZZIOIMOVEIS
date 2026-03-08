import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.leads.findIndex((l: any) => l.id === id);
  if (index !== -1) {
    const updatedLead = { ...db.leads[index], ...body };
    if (body.name) {
      updatedLead.initials = body.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    db.leads[index] = updatedLead;
    writeDB(db);
    return NextResponse.json(db.leads[index]);
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDB();
  db.leads = db.leads.filter((l: any) => l.id !== id);
  writeDB(db);
  return NextResponse.json({ success: true });
}
