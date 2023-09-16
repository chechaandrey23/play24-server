import {IsInt, IsNotEmpty, Min, Max, MinLength, MaxLength, IsNumberString, ArrayNotEmpty,
        IsString, IsArray, IsBoolean, IsEmail, ValidateIf, ValidateNested, IsDefined,
        IsPhoneNumber, IsMongoId, ArrayMaxSize} from 'class-validator';
import {Transform, Type} from 'class-transformer';

import {IsStringOrArrayString} from '../../utils/validator.is.string.or.array.string';

export class QuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;
}

export class QuizAttemptDTO extends QuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  attemptId: string;
}

export class QuizAttemptQuestionDTO extends QuizAttemptDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  questionId: string;
}

export class AnswerDTO {
  @ValidateIf(o => o.answer !== null && o.answer !==undefined)
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
	@IsString()
  answer?: string;

  @ValidateIf(o => Array.isArray(o.answerArray))
  @ArrayNotEmpty()
  @ArrayMaxSize(20)
  @MinLength(1, {each: true})
  @MaxLength(255, {each: true})
  @IsNotEmpty({each: true})
	@IsString({each: true})
  answerArray?: Array<string>;
}
