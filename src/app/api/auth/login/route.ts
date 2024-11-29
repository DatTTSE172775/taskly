import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập không tồn tại." },
        { status: 400 }
      );
    }

    // compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu không chính xác." },
        { status: 400 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Biến môi trường JWT_SECRET không được thiết lập");
    }

    const payload = { id: user._id, username: user.username };

    // creare JWT token
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    // return token
    return NextResponse.json({
      success: true,
      data: {
        token,
        username: user.username,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi đăng nhập: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}