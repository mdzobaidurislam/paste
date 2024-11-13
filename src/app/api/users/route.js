import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import mongoose from "mongoose";

// GET all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).select("-password");
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create new user
export async function POST(request) {
  try {
    await connectToDatabase();
    const {
      name,
      email,
      password,
      referral_code,
      isVerified,
      monetization,
      isAdmin,
      waiting_time,
    } = await request.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referral_code,
      isVerified,
      monetization,
      isAdmin,
      waiting_time,
    });

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(request) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    console.log("Received userId:", userId); // Debug log

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Clean the userId string
    const cleanUserId = userId.trim();

    console.log("Cleaned userId:", cleanUserId); // Debug log

    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
      return NextResponse.json(
        { error: `Invalid user ID format: ${cleanUserId}` },
        { status: 400 }
      );
    }

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(cleanUserId);

    console.log("Deleted user:", deletedUser); // Debug log

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
