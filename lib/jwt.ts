import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "24h",
};

const secret_key = process.env.SECRET_KEY;

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION,
) {
  const token = jwt.sign(payload, secret_key!, options);

  return token;
}

export function verifyJwt(token: string) {
  try {
    const decode = jwt.verify(token, secret_key!);

    return decode as JwtPayload;
  } catch (error) {
    console.log(error);

    return null;
  }
}
