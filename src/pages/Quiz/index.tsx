import { useLocation, useNavigate } from "@solidjs/router";
import Question from "../../components/Question";
import quizzesData from "../../data/quizzes";
import TopProgressBar from "../../components/TopProgressBar";
import BaseTemplate from "../../components/templates/BaseTemplate";
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";
import { shuffleArray } from "../../lib/utils";
import { Quiz as TQuiz } from "../../types/quiz";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation<{
    quizName?: string;
  }>();
  const [quiz, setQuiz] = createSignal<TQuiz | undefined>();
  const [choices, setChoices] = createSignal<string[]>([]);
  const [quizListIdx, setQuizListIdx] = createSignal(0);
  const [correctQuestions, setCorrectQuestions] = createSignal<
    TQuiz["quizList"]
  >([]);
  const round = () => quizListIdx() + 1;
  const currentQuestion = createMemo(() => quiz()?.quizList[quizListIdx()]);

  createEffect(() => {
    const CHOICE_CNT = 4;
    const q = quiz();
    const currentQuizListIdx = quizListIdx();

    if (!q || q.quizList.length < CHOICE_CNT) return [];

    const choices: string[] = [q.quizList[currentQuizListIdx].answer];

    while (choices.length < CHOICE_CNT) {
      const randIdx = Math.floor(Math.random() * q.quizList.length);

      const alreadyExistInArray = choices.find(
        (c) => c === q.quizList[randIdx].answer
      );
      if (alreadyExistInArray) continue;

      choices.push(q.quizList[randIdx].answer);
    }

    setChoices(shuffleArray(choices));
  });

  const handleAnswer = (index: number) => {
    const q = quiz();
    if (!q) {
      alert("Something went wrong. Please, refresh the website.");
      return;
    }

    const userAnswer = choices()[index];
    const listIdx = quizListIdx();
    const currentQuestion = q.quizList[listIdx];

    alert(
      `userAnswer: ${userAnswer}. currentQuestio.answer: ${currentQuestion.answer}`
    );

    if (currentQuestion.answer === userAnswer) {
      setCorrectQuestions((prevCorrectQuestions) =>
        prevCorrectQuestions.concat(currentQuestion)
      );
    }

    if (listIdx === q.quizList.length - 1) {
      navigate("/result", {
        state: {
          quiz: q,
          correctQuestions: correctQuestions(),
        },
      });
      return;
    }

    setQuizListIdx((prevIdx) => prevIdx + 1);
  };

  onMount(() => {
    const quiz = quizzesData.find(
      (q) => q.quizName === location.state?.quizName
    );

    if (!quiz) {
      navigate("/");
      return;
    }

    quiz.quizList = shuffleArray(quiz.quizList);
    setQuiz(quiz);
  });

  return (
    <BaseTemplate>
      <Show when={quiz() !== undefined} fallback={<div>Loading...</div>}>
        <TopProgressBar value={round()} max={quiz()?.quizList.length || 0} />
        <Question
          question={currentQuestion()?.question || ""}
          choices={choices()}
          onAnswer={handleAnswer}
        />
      </Show>
    </BaseTemplate>
  );
};

export default Quiz;
