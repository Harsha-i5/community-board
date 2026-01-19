import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Fetch all categories
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('community-board');
    const categories = await db.collection('categories').find({}).toArray();
    
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create new category
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('community-board');
    const body = await request.json();
    
    const newCategory = {
      name: body.name,
      description: body.description,
      posts: body.posts || 0,
      createdAt: new Date(),
    };
    
    const result = await db.collection('categories').insertOne(newCategory);
    
    return NextResponse.json({ 
      success: true, 
      data: { ...newCategory, _id: result.insertedId } 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}