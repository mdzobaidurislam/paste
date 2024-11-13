import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string

export async function POST(req) {
  const { orderId, payerId, amount } = await req.json();

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("pasterdb"); // Replace with your database name

    // Save the transaction
    await db.collection("transactions").insertOne({
      orderId,
      payerId,
      amount,
      createdAt: new Date(),
    });

    client.close();
    return NextResponse.json(
      { message: "Transaction saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
