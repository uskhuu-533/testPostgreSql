import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const foods = await prisma.food.findMany();
    return NextResponse.json(foods, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

