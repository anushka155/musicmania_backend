import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import { APP_KEY } from "../configs/appConst.js";

export default (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) {
    const err = new Error("Authorization error");
    err.statusCode = 401;
    throw err;
  }

  const token = authorization.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = verify(token, APP_KEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error("unable  to authenticated");
    err.statusCode = 401;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
};
