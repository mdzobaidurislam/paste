import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import mongoose from "mongoose";

// DELETE user
export async function POST(request) {
  try {
    await connectToDatabase();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: `Invalid user ID format: ${userId}` },
        { status: 400 }
      );
    }

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error); // More detailed error logging
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
