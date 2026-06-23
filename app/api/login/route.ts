import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const {
      email,
      senha,
      lembrar,
    } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Usuário não encontrado",
        },
        {
          status: 401,
        }
      );
    }

    const validPassword =
      await bcrypt.compare(
        senha,
        user.password
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          message: "Senha inválida",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: lembrar
          ? "30d"
          : "1d",
      }
    );

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: lembrar
          ? 60 * 60 * 24 * 30
          : 60 * 60 * 24,
      }
    );

    return response;
  } catch (error) {
  console.error("LOGIN ERROR:", error);

  return NextResponse.json(
    {
      message: "Erro interno",
      error: String(error),
    },
    {
      status: 500,
    }
  );
  }
}