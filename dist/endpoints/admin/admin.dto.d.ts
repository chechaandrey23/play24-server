export declare class QuizDTO {
    quizId: string;
}
export declare class ResultsForQuizDTO {
    quizId: string;
}
export declare class ResetResultQuizAttemptDTO extends ResultsForQuizDTO {
    userId: string;
    attemptId: string;
}
export declare class QuizAllQuestionsDTO {
    quizId: string;
}
export declare class QuizQuestionDTO extends QuizAllQuestionsDTO {
    questionId: string;
}
export declare class CreateQuizDTO {
    quizname: string;
    description: string;
    duration: number;
    numberOfAttempts: number;
    draft: boolean;
}
export declare class DeleteQuizDTO {
    id: string;
}
export declare class EditQuizDraftDTO extends DeleteQuizDTO {
    draft: boolean;
}
export declare class CreateQuestionDTO {
    quizId: string;
    questionTypeId: string;
    question: string;
    answerOptions?: Array<string>;
    answer?: string;
    answerArray?: Array<string>;
    draft: boolean;
}
export declare class DeleteQuestionDTO {
    id: string;
}
export declare class EditQuestionDraftDTO extends DeleteQuestionDTO {
    draft: boolean;
}
declare class OrderQuestionItemDTO {
    id: string;
    order: number;
}
export declare class OrderQuestionsDTO {
    quizId: string;
    orderQuestions: Array<OrderQuestionItemDTO>;
}
export {};
