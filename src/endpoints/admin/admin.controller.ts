import {Body, Controller, Get, Post, Param, Query, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

import {AdminService} from './admin.service';

import {
  QuizDTO,
  ResultsForQuizDTO, ResetResultQuizAttemptDTO,
  QuizAllQuestionsDTO, QuizQuestionDTO,
  CreateQuizDTO, DeleteQuizDTO,
  CreateQuestionDTO, DeleteQuestionDTO,
  OrderQuestionsDTO,
  EditQuizDraftDTO, EditQuestionDraftDTO,
} from './admin.dto';

import {JWTAccessAuthGuard} from '../auth/guards/jwt.access.auth.guard';
import {JWTRefreshAuthGuard} from '../auth/guards/jwt.refresh.auth.guard';

import {UserRoleGuard} from '../auth/guards/user.role.guard';
import {AdminRoleGuard} from '../auth/guards/admin.role.guard';

import {Quiz, QuizDocument} from '../../entries/quizs/quiz.model';
import {Question, QuestionDocument} from '../../entries/questions/question.model';
import {Result, ResultDocument} from '../../entries/results/result.model';
import {QuestionType, QuestionTypeDocument} from '../../entries/question-types/question.type.model';
import {Attempt, AttemptDocument} from '../../entries/attempts/attempt.model';

import {
  ExpressUser, ExpressUserAccessToken, ExpressUserRefreshToken,
} from '../auth/strategies/strategies.interface';


@UseGuards(AdminRoleGuard)// second call
@UseGuards(JWTAccessAuthGuard)// first call
@UsePipes(new ValidationPipe({transform: true}))
@Controller('admin/api')
export class AdminController {
	constructor(
		private adminService: AdminService,
	) {}

  @Get('/quizs')
  public async getAllQuizs(@Req() req: Request): Promise<Array<QuizDocument>> {
    return await this.adminService.getAllQuizs(req, {});
  }

  @Get('/quiz/:quizId')
  public async getQuiz(@Req() req: Request, @Param() quizDTO: QuizDTO): Promise<QuizDocument> {
    return await this.adminService.getQuiz(req, {
      quizId: quizDTO.quizId,
    });
  }

  @Get('/result-quiz/:quizId')
  public async getResultsForQuiz(@Req() req: Request, @Param() resultsForQuiz: ResultsForQuizDTO): Promise<QuizDocument> {
    return await this.adminService.getResultsForQuiz(req, {
      quizId: resultsForQuiz.quizId,
    });
  }

  @Post('/reset-result-quiz')
  public async resetResultQuiz(@Req() req: Request, @Body() resetResultQuizAttempt: ResetResultQuizAttemptDTO): Promise<AttemptDocument> {
    return await this.adminService.resetResultQuiz(req, {
      quizId: resetResultQuizAttempt.quizId,
      userId: resetResultQuizAttempt.userId,
      attemptId: resetResultQuizAttempt.attemptId,
    });
  }

  // ...........................................................................

  @Get('/quiz/:quizId/questions')
  public async getQuizAllQuestions(@Req() req: Request, @Param() quizAllQuestionsDTO: QuizAllQuestionsDTO): Promise<Array<QuestionDocument>> {
    return await this.adminService.getQuizAllQuestions(req, {
      quizId: quizAllQuestionsDTO.quizId,
    });
  }

  @Get('/quiz/:quizId/questions2')
  public async getQuizAllQuestions2(@Req() req: Request, @Param() quizAllQuestionsDTO: QuizAllQuestionsDTO): Promise<QuizDocument> {
    return await this.adminService.getFullQuiz(req, {
      quizId: quizAllQuestionsDTO.quizId,
    });
  }

  @Get('/quiz/:quizId/question/:questionId')
  public async getQuizQuestion(@Req() req: Request, @Param() quizQuestionDTO: QuizQuestionDTO): Promise<QuestionDocument> {
    return await this.adminService.getQuizQuestion(req, {
      quizId: quizQuestionDTO.quizId,
      questionId: quizQuestionDTO.questionId,
    });
  }

  @Post('/quiz-create')
  public async createQuiz(@Req() req: Request, @Body() createQuizDTO: CreateQuizDTO): Promise<QuizDocument> {
    return await this.adminService.createQuiz(req, {
      quizname: createQuizDTO.quizname,
      draft: createQuizDTO.draft,
      authorId: (req.user as ExpressUserAccessToken)?.id,
      description: createQuizDTO.description,
      duration: createQuizDTO.duration,
      numberOfAttempts: createQuizDTO.numberOfAttempts,
    });
  }

  @Post('/quiz-delete')
  public async deleteQuiz(@Req() req: Request, @Body() deleteQuizDTO: DeleteQuizDTO): Promise<QuizDocument> {
    return await this.adminService.deleteQuiz(req, {
      id: deleteQuizDTO.id,
      authorId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  @Post('/quiz-edit/draft')
  public async editQuizDraft(@Req() req: Request, @Body() editQuizDraftDTO: EditQuizDraftDTO): Promise<QuizDocument> {
    return await this.adminService.editQuizDraft(req, {
      id: editQuizDraftDTO.id,
      draft: editQuizDraftDTO.draft,
    });
  }

  //@Post('/quiz/:quizId/question-create')
  @Post('/question-create')
  public async createQuestion(@Req() req: Request, @Body() createQuestionDTO: CreateQuestionDTO): Promise<QuestionDocument> {
    return await this.adminService.createQuestion(req, {
      quizId: createQuestionDTO.quizId,
      questionTypeId: createQuestionDTO.questionTypeId,
      question: createQuestionDTO.question,
      answerOptions: createQuestionDTO.answerOptions,
      answer: createQuestionDTO.answer,
      answerArray: createQuestionDTO.answerArray,
      draft: createQuestionDTO.draft,
      authorId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  @Post('/question-edit/draft')
  public async editQuestionDraft(@Req() req: Request, @Body() editQuestionDraftDTO: EditQuestionDraftDTO): Promise<QuestionDocument> {
    return await this.adminService.editQuestionDraft(req, {
      id: editQuestionDraftDTO.id,
      draft: editQuestionDraftDTO.draft,
    });
  }

  //@Post('/quiz/:quizId/question-delete')
  @Post('/question-delete')
  public async deleteQuestion(@Req() req: Request, @Body() deleteQuestionDTO: DeleteQuestionDTO): Promise<QuestionDocument> {
    return await this.adminService.deleteQuestion(req, {
      id: deleteQuestionDTO.id,
      authorId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  //@Post('/quiz/:quizId/order-questions')
  @Post('/order-questions')
  public async orderQuestions(@Req() req: Request, @Body() orderQuestionsDTO: OrderQuestionsDTO): Promise<Array<QuestionDocument>> {
    return await this.adminService.orderQuestions(req, {
      quizId: orderQuestionsDTO.quizId,
      orderQuestions: orderQuestionsDTO.orderQuestions,
    });
  }

  //............................................................................

  @Get('/question-types')
  public async getAllQuestionTypes(@Req() req: Request): Promise<Array<QuestionTypeDocument>> {
    return await this.adminService.getAllQuestionTypes(req, {});
  }
}
