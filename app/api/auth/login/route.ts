/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from "bcrypt";

import { InternalError, NotFoundError, UnauthorizedError } from "@/errors";
import prisma from "@/lib/prisma";
import { signJwtAccessToken } from "@/lib/jwt";
import { LoginSchemaTypeProps } from "@/types";

export async function POST(request: Request) {
  try {
    const body: LoginSchemaTypeProps = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Senha incorreta.");
    }

    if (user && passwordMatch) {
      const { password, ...userWithoutPass } = user;
      const accesstoken = signJwtAccessToken(userWithoutPass);

      const result = { ...userWithoutPass, accesstoken };

      return new Response(
        JSON.stringify({ result, message: "Acesso autorizado." }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error = new InternalError("Internal server error");
    }

    return new Response(
      JSON.stringify({
        error: error.message,
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
