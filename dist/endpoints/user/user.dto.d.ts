export declare class QuizDTO {
    quizId: string;
}
export declare class QuizAttemptDTO extends QuizDTO {
    attemptId: string;
}
export declare class QuizAttemptQuestionDTO extends QuizAttemptDTO {
    questionId: string;
}
export declare class AnswerDTO {
    answer?: string;
    answerArray?: Array<string>;
}
