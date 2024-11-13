import connectToDatabase from "@/app/dbconfig/dbconfig";
import Paster from "../../../models/pasterModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { title, content } = reqBody;
    console.log(reqBody);

    const newPaster = new Paster({
      title,
      content,
    });
    const savedPaster = await newPaster.save(); // Ensure this line is uncommented
    console.log(savedPaster); // Log the saved document for debugging
    const lastPaster = await Paster.findOne({}).sort({ createdAt: -1 }).exec();
    const response = NextResponse.json({
      message: "Pasted successfully",
      success: true,
      lastPaster: lastPaster._id,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
