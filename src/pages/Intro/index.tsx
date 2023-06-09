import { For, createSignal } from "solid-js";
import BaseTemplate from "../../components/templates/BaseTemplate";
import quizzesData from "../../data/quizzes";
import { useNavigate } from "@solidjs/router";
import KeyEvent, { Key } from "../../components/functions/KeyEvent";
import Button from "../../components/Button";
import fontSignal from "../../stores/fontSignal";
import { evalScore, getPlayHistory } from "../../lib/playHistory";
import Badge, { BadgeColor } from "../../components/Badge";

const Intro = () => {
  const [, , nextFont] = fontSignal;
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

  const nextArrowVisible = () => {
    return selectedQuizIdx() === 0 && quizzes().length >= 3;
  };

  const handleKeyEvent = (key: Key) => {
    switch (key) {
      case "Enter":
        const selectedQuiz = quizzes()[1];
        if (!selectedQuiz) break;
        navigateToQuiz(selectedQuiz.quizName);
        break;
      case "ArrowUp":
        setSelectedQuizIdx((prevSelctedQuizIdx) =>
          prevSelctedQuizIdx > 0 ? prevSelctedQuizIdx - 1 : prevSelctedQuizIdx
        );
        break;
      case "ArrowDown":
        setSelectedQuizIdx((prevSelctedQuizIdx) =>
          prevSelctedQuizIdx < quizzesData.length - 1
            ? prevSelctedQuizIdx + 1
            : prevSelctedQuizIdx
        );
        break;
    }
  };

  const navigateToQuiz = (quizName: string) => {
    navigate("/quiz", {
      state: {
        quizName,
      },
    });
  };

  return (
    <BaseTemplate>
      <KeyEvent
        onKeyUp={handleKeyEvent}
        keys={["Enter", "ArrowUp", "ArrowDown"]}
      />
      <div class="text-center h-full">
        <h1 class="text-5xl h-2/6 block flex items-end justify-center p-4">
          English Quiz
        </h1>
        <div class="mt-16 text-2xl flex flex-col gap-y-6 px-8">
          <For each={quizzes()} fallback={<>Loading...</>}>
            {(quiz, quizIdx) => {
              const handleQuizClick = () => {
                if (quizIdx() === 1) {
                  navigateToQuiz(quiz?.quizName || "");
                } else {
                  setSelectedQuizIdx((prevIdx) => prevIdx + quizIdx() - 1);
                }
              };

              let badge: { color: BadgeColor; text: string } | undefined =
                undefined;
              const score = quiz ? getPlayHistory(quiz.quizName) : undefined;

              if (score) {
                const scoreGrade = evalScore(score);

                if (scoreGrade === 1) {
                  badge = {
                    color: "blue",
                    text: "1",
                  };
                } else if (scoreGrade === 2) {
                  badge = {
                    color: "green",
                    text: "2",
                  };
                } else {
                  badge = {
                    color: "red",
                    text: "3",
                  };
                }
              }

              return (
                <div class="relative mx-auto">
                  {badge && (
                    <div class="absolute right-full bottom-full translate-y-2/3">
                      <Badge size="sm" color={badge.color}>
                        {badge.text}
                      </Badge>
                    </div>
                  )}
                  <div
                    onClick={quiz === null ? undefined : handleQuizClick}
                    class="hover:cursor-pointer relative"
                    classList={{ "text-3xl animate-bounce": quizIdx() === 1 }}
                  >
                    {quiz?.quizName}
                  </div>
                </div>
              );
            }}
          </For>
          {nextArrowVisible() && (
            <div onClick={() => setSelectedQuizIdx(1)}>⬇️</div>
          )}
        </div>
        <div class="fixed left-4 bottom-4">
          <Button color="lime" onClick={nextFont}>
            Font
          </Button>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Intro;
