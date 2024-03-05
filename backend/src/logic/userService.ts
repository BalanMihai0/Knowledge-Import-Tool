import User, { UserModel } from "../repository/db/User";
import bcrypt from "bcrypt";

class UserService {
  
  static addUser = async (username: string, password: string): Promise<boolean> => {
    try {
      const hashedPassword = await hashPass(password);
      if (!hashedPassword) {
        throw new Error('Error hashing password');
      }

      const user = await User.create({
        username,
        password: hashedPassword,
      });

      console.log('User registered:', user.toJSON());
      return true;
    } catch (error : any) {
      console.error('Error registering user:', error.message);
      return false;
    }
  };

  static removeUser = async (id: number): Promise<boolean> => {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        console.error('User not found');
        return false;
      }

      await user.destroy();
      console.log('User removed:', user.toJSON());
      return true;
    } catch (error: any) {
      console.error('Error removing user:', error.message);
      return false;
    }
  };

  static getUser = async (id: number): Promise<UserModel | null> => {
    try {
      const user = await User.findByPk(id) as UserModel | null;      
      return user || null;
    } catch (error: any) {
      console.error('Error getting user:', error.message);
      return null;
    }
  };

  static authenticateUser = async (username: string, password: string): Promise<UserModel | undefined> => {
    try {
      const user = (await User.findOne<UserModel>({
        where: {
          username: username,
        },
      })) as UserModel | null;

      if (user) {
        const result = await comparePasswords(password, user.dataValues.password);

        if (result) {
          console.log("Password is correct. User is authenticated.");
          return user;
        } else {
          console.log("Password is incorrect. Authentication failed.");
        }
      }

      console.log("User not found. Authentication failed.");
      return undefined;
    } catch (error: any) {
      console.error('Error authenticating user:', error.message);
      return undefined;
    }
  };
}

const hashPass = async (password: string): Promise<string | undefined> => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    return undefined;
  }
};

const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error("Error comparing passwords:", err);
    return false;
  }
};

export default UserService;
