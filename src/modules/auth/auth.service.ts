import userModel from "../../modules/users/models/user.model";
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";
import { JwtPayload } from "../../interfaces/jwt.interface";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.config";
import HttpException from "../../exceptions/http.exception";
import bcrypt from "bcrypt";

class AuthService {
  public user = userModel;

  public async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;

    const userExist = await this.user.findOne({ email: email });

    if (userExist) {
      throw new HttpException(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.user.create({
      email,
      username,
      password: hashedPassword,
    });

    return this.createToken({ sub: user._id });
  }

  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.user.findOne({ email: email });

    if (!user) {
      throw new HttpException(409, "User not found");
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordMatching) {
      throw new HttpException(401, "Unauthorized");
    }

    return this.createToken({ sub: user._id });
  }

  private async createToken(jwtPayload: JwtPayload) {
    return jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }
}

export default AuthService;
