import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// PUT - Update category
export async function PUT(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db('community-board');
    const body = await request.json();
    const { id } = await context.params;
    
    const result = await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          name: body.name,
          description: body.description,
          posts: body.posts,
          updatedAt: new Date(),
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - Delete category
export async function DELETE(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db('community-board');
    const { id } = await context.params;
    
    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}