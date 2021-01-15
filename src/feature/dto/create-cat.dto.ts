import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  constructor(name: string, age: number, color: string) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  @IsString()
  @MinLength(1, {
    message: 'name is too short',
  })
  @MaxLength(10, {
    message: 'name is too long',
  })
  readonly name: string;

  @IsNumber()
  @Min(0, {
    message: 'age must be greater than 0',
  })
  @Max(30, {
    message: 'age must be less than 30',
  })
  readonly age: number;

  @IsString()
  readonly color: string;
}
