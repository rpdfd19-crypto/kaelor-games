import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Não autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: number;
      name: string;
      role: "USER" | "ADMIN";
    };

    return NextResponse.json({
      loggedIn: true,
      name: decoded.name,
      role: decoded.role,
    });
  } catch {
    return NextResponse.json(
      { message: "Token inválido" },
      { status: 401 }
    );
  }
}