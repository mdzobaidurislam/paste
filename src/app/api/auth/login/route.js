import connectToDatabase from "@/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "@/models/userModels";

export async function POST(request) {
  try {
    await connectToDatabase();

    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with explicitly setting isAdmin to false
      const newUser = new User({
        email,
        isVerified: true,
        password: null,
        referral_code: null,
        waiting_time: 2,
        monetization: false,
        isAdmin: false, // Set isAdmin explicitly
        verifyToken: null,
        verifyTokenExpiry: null,
      });

      const savedUser = await newUser.save();
      console.log(savedUser); // Log the saved user
      user = await User.findOne({ email });
    }

    console.log("user exists");
    console.log(user.isAdmin); // Log to check if isAdmin is set

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    // After authentication, we send a token with certain information in cookies
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin, // Ensure this is part of the response
      },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
