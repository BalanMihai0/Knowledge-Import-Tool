import jwt from "jsonwebtoken";

const getUserId = (token: string): number => {
  const payload = jwt.decode(token) as Payload;
  if (payload) return payload.id;
  else return 0;
};

export default getUserId;
