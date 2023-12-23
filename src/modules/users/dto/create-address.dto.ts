import { IsString } from "class-validator";

class CreateAddressDto {
  @IsString()
  public street!: string;

  @IsString()
  public city!: string;

  @IsString()
  public country!: string;

  @IsString()
  public zip!: string;
}

export default CreateAddressDto;
