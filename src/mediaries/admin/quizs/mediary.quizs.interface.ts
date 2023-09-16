export interface QuestionTypesInterface {}

export interface GetQuizsInterface {}

export interface GetFullQuizInterface {
  quizId: string;
}

export interface GetQuizInterface {
  quizId: string;
}

export interface CreateQuizInterface {
  quizname: string;
  draft: boolean;
  authorId: string;
  description: string;
  duration: number;
  numberOfAttempts: number;
}

export interface DeleteQuizInterface {
  id: string;
  deleteWithQuestions: boolean;
  authorId: string;
}

export interface EditQuizDraftInterface {
  id: string;
  draft: boolean;
}

export interface GetQuizAllQuestionsInterface {
  quizId: string;
}

export interface GetQuizQuestionInterface {
  quizId: string;
  questionId: string;
}

export interface CreateQuestionInterface {
  quizId: string;
  questionTypeId: string;
  question: string;
  answerOptions?: Array<string>;
  answer?: string;
  answerArray?: Array<string>;
  draft: boolean;
  authorId: string;
}

export interface EditQuestionDraftInterface {
  id: string;
  draft: boolean;
}

export interface DeleteQuestionInterface {
  id: string;
  authorId: string;
}

export interface OrderQuestionsInterface {
  quizId: string;
  orderQuestions: Array<{id: string, order: number}>;
}
