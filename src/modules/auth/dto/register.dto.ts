import { IsString } from "class-validator";
import LoginDto from "./login.dto";

class RegisterDto extends LoginDto {
  @IsString()
  public username!: string;
}

export default RegisterDto;
