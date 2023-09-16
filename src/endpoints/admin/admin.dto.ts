import {IsInt, IsNotEmpty, Min, Max, MinLength, MaxLength, IsNumberString, ArrayNotEmpty,
        IsString, IsArray, IsBoolean, IsEmail, ValidateIf, ValidateNested, IsDefined,
        IsPhoneNumber, IsMongoId, ArrayMaxSize, ArrayMinSize} from 'class-validator';
import {Transform, Type} from 'class-transformer';

import {IsStringOrArrayString} from '../../utils/validator.is.string.or.array.string';

export class QuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;
}

export class ResultsForQuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;
}

export class ResetResultQuizAttemptDTO extends ResultsForQuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  attemptId: string;
}

export class QuizAllQuestionsDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;
}

export class QuizQuestionDTO extends QuizAllQuestionsDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  questionId: string;
}

export class CreateQuizDTO {
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
	@IsString()
  quizname: string;

  @MinLength(0)
  @MaxLength(255)
	@IsString()
  description: string;

  @Transform(({value}) => {return value * 1})
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  duration: number;

  @Transform(({value}) => {return value * 1})
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  numberOfAttempts: number;

  @Transform(({value}) => {return !!value})
	@IsBoolean()
  draft: boolean;
}

export class DeleteQuizDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  id: string;
}

export class EditQuizDraftDTO extends DeleteQuizDTO {
  @Transform(({value}) => {return !!value})
	@IsBoolean()
  draft: boolean;
}

export class CreateQuestionDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;

  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  questionTypeId: string;

  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
	@IsString()
  question: string;

  @ValidateIf(o => Array.isArray(o.answerOptions))
  @ArrayNotEmpty()
  @ArrayMaxSize(20)
  @ArrayMinSize(2)
  @MinLength(1, {each: true})
  @MaxLength(255, {each: true})
  @IsNotEmpty({each: true})
	@IsString({each: true})
  answerOptions?: Array<string>;

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

  @Transform(({value}) => {return !!value})
	@IsBoolean()
  draft: boolean;
}

export class DeleteQuestionDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  id: string;
}

export class EditQuestionDraftDTO extends DeleteQuestionDTO {
  @Transform(({value}) => {return !!value})
	@IsBoolean()
  draft: boolean;
}

class OrderQuestionItemDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  id: string;

  @Transform(({value}) => {return value * 1})
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  order: number;
}

export class OrderQuestionsDTO {
  @IsMongoId()
  @IsNotEmpty()
	@IsString()
  quizId: string;

  @ValidateNested({ each: true })
  orderQuestions: Array<OrderQuestionItemDTO>;
}
