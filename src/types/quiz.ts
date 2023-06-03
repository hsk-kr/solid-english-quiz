export interface Quiz {
  quizName: string;
  quizList: {
    answer: string;
    question: string;
  }[];
}

export interface PlayHistory {
  [key: string]: number;
}
