import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserAnswerDto)
  answers: UserAnswerDto[];
}

class UserAnswerDto {
  @IsNumber()
  questionId: number;

  @IsString()
  userAnswer: string;
}
