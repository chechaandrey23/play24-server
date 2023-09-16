export interface GetQuizsInterface {
  userId: string;
}

export interface GetQuizInterface {
  userId: string;
  quizId: string;
}

export interface GetQuizWithAttemptInterface extends GetQuizInterface {
  attemptId: string;
}

export interface CreateAttemptInterface {
  userId: string;
  quizId: string;
}

export interface GetQuizAllAttemptsInterface {
  userId: string;
  quizId: string;
}
/*
export interface CheckQuizIntactInterface {
  userId: string;
  quizId: string;
}

export interface CheckFastIntactQuizInterface extends CheckQuizIntactInterface {}
*/
export interface GetQuizAllQuestionsInterface {
  userId: string;
  quizId: string;
  attemptId: string;
}

export interface GetQuizQuestionInterface {
  userId: string;
  quizId: string;
  questionId: string;
  attemptId: string;
}

export interface SetQuizQuestionInterface {
  userId: string;
  quizId: string;
  questionId: string;
  attemptId: string;
  answer: string;
  answerArray: Array<string>;
}

export interface FinishQuizAttemptInterface {
  userId: string;
  quizId: string;
  attemptId: string;
}

export interface GetFullQuizInterface {
  userId: string;
  quizId: string;
  attemptId: string;
}
