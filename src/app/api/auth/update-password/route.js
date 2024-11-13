import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await connectToDatabase();
    console.log(email, password);

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user password with $set
    const updateResult = await User.updateOne(
      { email }, // Find by email
      { $set: { password: hashedPassword } }, // Set new password
      { new: true }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "User not found or password unchanged" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
