/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from "bcrypt";

import { BadRequestError, InternalError } from "@/errors";
import prisma from "@/lib/prisma";
import { RegisterSchemaTypeProps } from "@/types";
import { registerSchema } from "@/zod";

export async function POST(request: Request) {
  try {
    const body: RegisterSchemaTypeProps = await request.json();

    const { success, data, error } = registerSchema.safeParse(body);

    if (!success) {
      throw new BadRequestError(error.message);
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExists)
      throw new BadRequestError(
        JSON.stringify({ message: "Usuário já existe" }),
      );

    const user = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;

    return Response.json({ result, message: "Usuário criado com sucesso!" });
  } catch (error: any) {
    if (!error.statusCode) error = new InternalError("Internal server error");

    return new Response(
      JSON.stringify({
        error: JSON.parse(error.message),
      }),
      {
        status: error.statusCode,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
