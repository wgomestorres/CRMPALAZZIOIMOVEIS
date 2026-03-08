import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.leads);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDB();
  const colors = [
    'bg-primary/10 text-primary',
    'bg-orange-100 text-orange-600',
    'bg-blue-100 text-blue-600',
    'bg-emerald-100 text-emerald-600',
    'bg-purple-100 text-purple-600'
  ];
  const newLead = {
    ...body,
    id: uuidv4(),
    activity: new Date().toISOString().split('T')[0],
    initials: body.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
    color: colors[Math.floor(Math.random() * colors.length)]
  };
  db.leads.push(newLead);
  writeDB(db);
  return NextResponse.json(newLead);
}
