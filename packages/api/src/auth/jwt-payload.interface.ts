
export class JwtPayload {
  username: string;
  email: string;
  id: number;
  country: string;
  iat: number;
  exp: number;
}

export class JwtPayloadReponse {
  access_token: string;
  data: JwtPayload;
}
