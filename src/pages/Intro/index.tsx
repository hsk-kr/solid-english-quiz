import { For, createEffect, createSignal } from "solid-js";
import BaseTemplate from "../../components/templates/BaseTemplate";
import quizzesData from "../../data/quizzes";
import ArrowKeys from "../../components/functions/ArrowKeys";
import { useNavigate } from "@solidjs/router";
import Enter from "../../components/functions/Enter";

const Intro = () => {
  const [selectedQuizIdx, setSelectedQuizIdx] = createSignal(0);
  const navigate = useNavigate();
  const quizzes = () => {
    const quizzesListToShow = [];
    const startIdx = selectedQuizIdx();

    for (let i = startIdx - 1; i < startIdx + 2; i++) {
      if (i >= 0 && i < quizzesData.length) {
        quizzesListToShow.push(quizzesData[i]);
      } else {
        quizzesListToShow.push(null);
      }
    }

    return quizzesListToShow;
  };

  const handleKeyUp = () => {
    setSelectedQuizIdx((prevSelctedQuizIdx) =>
      prevSelctedQuizIdx > 0 ? prevSelctedQuizIdx - 1 : prevSelctedQuizIdx
    );
  };

  const handleKeyDown = () => {
    setSelectedQuizIdx((prevSelctedQuizIdx) =>
      prevSelctedQuizIdx < quizzesData.length - 1
        ? prevSelctedQuizIdx + 1
        : prevSelctedQuizIdx
    );
  };

  const navigateToQuiz = () => {
    navigate("/quiz");
  };

  const handleEnter = () => {
    navigateToQuiz();
  };

  return (
    <BaseTemplate>
      <Enter onEnter={handleEnter} />
      <ArrowKeys onUp={handleKeyUp} onDown={handleKeyDown} />
      <div class="pt-40 text-center">
        <h1 class="text-7xl">English Quiz</h1>
        <div class="mt-28 text-4xl flex flex-col gap-y-6">
          <For each={quizzes()} fallback={<>Loading...</>}>
            {(quiz, quizIdx) => {
              const handleQuizClick = () => {
                if (quizIdx() === 1) {
                  navigateToQuiz();
                } else {
                  setSelectedQuizIdx((prevIdx) => prevIdx + quizIdx() - 1);
                }
              };

              return (
                <div
                  onClick={quiz === null ? undefined : handleQuizClick}
                  class="h-14 mx-auto hover:cursor-pointer"
                  classList={{ "text-5xl": quizIdx() === 1 }}
                >
                  {quiz?.quizName}
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Intro;
