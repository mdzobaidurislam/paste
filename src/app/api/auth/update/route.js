import { NextResponse } from "next/server";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    console.log(body);
    let updateResult;
    if (body?.type == "monetization") {
      updateResult = await User.updateOne(
        { email: body.email },
        { $set: { monetization: body.monetization } },
        { new: true }
      );
    } else {
      updateResult = await User.updateOne(
        { email: body.email },
        { $set: { waiting_time: body.waiting_time } },
        { new: true }
      );
    }
    console.log(updateResult);

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message:
        body?.type == "monetization"
          ? "Monetization Updated successfully"
          : "Waiting time Updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
