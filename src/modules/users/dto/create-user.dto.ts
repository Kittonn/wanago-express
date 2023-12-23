import { IsEmail, IsOptional, IsString } from "class-validator";
import CreateAddressDto from "./create-address.dto";

class CreateUserDto {
  @IsString()
  public username!: string;

  @IsString()
  public password!: string;

  @IsEmail()
  public email!: string;

  @IsOptional()
  public address?: CreateAddressDto;
}

export default CreateUserDto;
