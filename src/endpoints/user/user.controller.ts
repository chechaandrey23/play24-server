import {Body, Controller, Get, Post, Param, Query, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

import {UserService} from './user.service';

import {
  //QuizDTO, QuizAllQuestionsDTO, QuizQuestionDTO, AnswerDTO
  QuizDTO, QuizAttemptDTO, QuizAttemptQuestionDTO, AnswerDTO,
} from './user.dto';

import {JWTAccessAuthGuard} from '../auth/guards/jwt.access.auth.guard';

import {UserRoleGuard} from '../auth/guards/user.role.guard';

import {Quiz, QuizDocument} from '../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../entries/questions/question.model';
import {Result, ResultDocument} from '../../entries/results/result.model';
import {Attempt, AttemptDocument} from '../../entries/attempts/attempt.model';

import {
  ExpressUser, ExpressUserAccessToken, ExpressUserRefreshToken,
} from '../auth/strategies/strategies.interface';

@UseGuards(UserRoleGuard)
@UseGuards(JWTAccessAuthGuard)
@UsePipes(new ValidationPipe({transform: true}))
@Controller('user/api')
export class UserController {
	constructor(
		private userService: UserService,
	) {}

  @Get('/quizs')
  public async getQuizs(@Req() req: Request): Promise<Array<QuizDocument>> {
    return await this.userService.getQuizs(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  @Get('/quiz/:quizId')
  public async getQuiz(@Req() req: Request, @Param() quizDTO: QuizDTO): Promise<QuizDocument> {
    return await this.userService.getQuiz(req, {
      quizId: quizDTO.quizId,
      userId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  @Get('/quiz-with-attempt/:quizId/:attemptId')
  public async getQuizWithAttempt(@Req() req: Request, @Param() quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument> {
    return await this.userService.getQuizWithAttempt(req, {
      quizId: quizAttemptDTO.quizId,
      attemptId: quizAttemptDTO.attemptId,
      userId: (req.user as ExpressUserAccessToken)?.id,
    });
  }
  /*
  @Get('/check-quiz/:id')
  public async checkIntactQuiz(@Req() req: Request, @Param() quizDTO: QuizDTO): Promise<QuizDocument> {
    return await this.userService.checkIntactQuiz(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizDTO.quizId,
    });
  }
  */

  // new attempt
  // get attempts
  // check expired attempt
  // finish attempt
  /*
  @Get('/fast-check-quiz/:quizId')
  public async checkFastIntactQuiz(@Req() req: Request, @Param() quizDTO: QuizDTO): Promise<QuizDocument> {
    return await this.userService.checkFastIntactQuiz(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizDTO.quizId,
    });
  }
  */

  @Post('/quiz/:quizId/create-attempt')
  public async createAttempt(@Req() req: Request, @Param() quizDTO: QuizDTO): Promise<AttemptDocument> {
    return await this.userService.createAttempt(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizDTO.quizId,
    });
  }

  @Get('/quiz/:quizId/attempts')
  public async getQuizAllAttempts(@Req() req: Request, quizDTO: QuizDTO): Promise<Array<AttemptDocument>> {
    return await this.userService.getQuizAllAttempts(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizDTO.quizId,
    });
  }

  @Get('/quiz/:quizId/questions/:attemptId')
  public async getQuizAllQuestions(@Req() req: Request, @Param() quizAttemptDTO: QuizAttemptDTO): Promise<Array<QuestionDocument>> {
    return await this.userService.getQuizAllQuestions(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizAttemptDTO.quizId,
      attemptId: quizAttemptDTO.attemptId,
    });
  }

  @Get('/quiz/:quizId/question/:questionId/:attemptId')
  public async getQuizQuestion(@Req() req: Request, @Param() quizAttemptQuestionDTO: QuizAttemptQuestionDTO): Promise<QuestionDocument> {
    return await this.userService.getQuizQuestion(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizAttemptQuestionDTO.quizId,
      attemptId: quizAttemptQuestionDTO.attemptId,
      questionId: quizAttemptQuestionDTO.questionId,
    });
  }

  // isRefreshToken
  @Post('/quiz/:quizId/question/:questionId/:attemptId')
  public async setQuizQuestion(@Req() req: Request, @Param() quizAttemptQuestionDTO: QuizAttemptQuestionDTO, @Body() answerDTO: AnswerDTO): Promise<QuestionDocument> {
    return await this.userService.setQuizQuestion(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizAttemptQuestionDTO.quizId,
      questionId: quizAttemptQuestionDTO.questionId,
      attemptId: quizAttemptQuestionDTO.attemptId,
      answer: answerDTO.answer,
      answerArray: answerDTO.answerArray,
    });
  }

  @Post('/quiz/:quizId/finish/:attemptId')
  public async finishQuiz(@Req() req: Request, @Param() quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument> {
    return await this.userService.finishQuizAttempt(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizAttemptDTO.quizId,
      attemptId: quizAttemptDTO.attemptId,
    });
  }

  @Get('/quiz/:quizId/questions2/:attemptId')
  public async getQuizAllQuestions2(@Req() req: Request, @Param() quizAttemptDTO: QuizAttemptDTO): Promise<QuizDocument> {
    return await this.userService.getFullQuiz(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
      quizId: quizAttemptDTO.quizId,
      attemptId: quizAttemptDTO.attemptId,
    });
  }
}
