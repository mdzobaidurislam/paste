import { NextResponse } from "next/server";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";

export async function POST(request) {
  try {
    const { email, referral_code } = await request.json();
    await connectToDatabase();
    const updateResult = await User.updateOne(
      { email }, // Find by email
      { $set: { referral_code: referral_code } }, // Set new password
      { new: true }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "User not found " }, { status: 404 });
    }

    return NextResponse.json({
      message: "Referral updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
