
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from '@prisma/client'
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        foods: true  // Optional: include related foods
      }
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    return NextResponse.json({ 
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    // Log all available methods on prisma
    console.log('Prisma client methods:', Object.keys(prisma));
    
    // Verify if category model exists
    console.log('Prisma category model:', prisma.category);

    // Parse request body
    const data = await request.json();
    console.log('Received data:', data);

    const { title } = data;

    // Validate input
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ 
        error: 'Invalid title. Title must be a non-empty string.' 
      }, { status: 400 });
    }

    // Attempt to create category with detailed logging
    console.log('Attempting to create category with title:', title);
    
    const newCategory = await prisma.category.create({
      data: { 
        title: title.trim() 
      },
    });

    console.log('Category created successfully:', newCategory);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Comprehensive error logging
    console.error('Full error object:', error);
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown error type');
    console.error('Error message:', error instanceof Error ? error.message : 'No error message');
    
    // Specific Prisma error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Error Code:', error.code);
      console.error('Prisma Error Meta:', error.meta);
    }

    return NextResponse.json({ 
      message: 'Failed to create category',
      error: error instanceof Error ? error.message : 'Unknown error',
      // Include additional debug info
      debugInfo: {
        hasPrismaClient: !!prisma,
        categoryModelExists: !!prisma?.category,
        errorType: error instanceof Error ? error.name : 'Unknown'
      }
    }, { status: 500 });
  }
}