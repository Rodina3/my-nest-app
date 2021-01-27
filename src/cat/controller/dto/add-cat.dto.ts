import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AddCatDto {
  constructor(name: string, age: number, color: string) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  @ApiModelProperty({ description: 'The name of the cat' })
  @IsString()
  @MinLength(3, {
    message: 'name is too short',
  })
  @MaxLength(10, {
    message: 'name is too long',
  })
  readonly name: string;

  @ApiModelProperty({ description: 'The age of the cat' })
  @IsNumber()
  @Min(0, {
    message: 'age must be greater than 0',
  })
  @Max(30, {
    message: 'age must be less than 30',
  })
  readonly age: number;

  @ApiModelProperty({ description: 'The color of the cat' })
  @IsString()
  readonly color: string;
}
