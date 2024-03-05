import jwt from "jsonwebtoken";
import config from "../../config.json";
import User from "../repository/db/User";

const signJWT = async (userId: number): Promise<string> => {
  try {
    const userInstance = await User.findByPk(userId);

    if (!userInstance) {
      throw new Error('User not found');
    }

    const token = jwt.sign({ id: userInstance.dataValues.id }, config.jwtSecret, { expiresIn: "1h" });

    return token;
  } catch (error : any) {
    console.error('Error signing JWT:', error.message);
    throw error;
  }
};

export default signJWT;
