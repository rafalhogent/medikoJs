import * as dotenv from 'dotenv';
dotenv.configDotenv();

export const jwtConstants = {
  secret: process.env.SECRET,
  accessTokenExp: process.env.ACCESS_TOKEN_EXP,
  refresTokenExp: process.env.REFRESH_TOKEN_EXP,
  BADTOKEN_MSG: 'BAD_TOKEN'
};
