import { A, useLocation, useNavigate } from "@solidjs/router";
import BaseTemplate from "../../components/templates/BaseTemplate";
import { Show, createEffect, createSignal, onMount } from "solid-js";
import Badge from "../../components/Badge";
import { evalScore, savePlayHistory } from "../../lib/playHistory";
import { Quiz } from "../../types/quiz";

const Result = () => {
  type LocationState = {
    quiz: Quiz;
    correctQuestions: Quiz["quizList"];
  };
  const navigate = useNavigate();
  const [locationData, setLocationData] = createSignal<LocationState>();
  const [score, setScore] = createSignal<number>();
  const location = useLocation<LocationState>();
  const badgeComp = () => {
    const s = score();
    if (s === undefined) return null;

    const grade = evalScore(s);
    if (grade === 1) {
      return <Badge color="blue">PERFECT!</Badge>;
    } else if (grade === 2) {
      return <Badge color="green">GOOD!</Badge>;
    } else {
      return <Badge color="red">PRACTICE!</Badge>;
    }
  };

  createEffect(() => {
    const { quiz } = location.state || {};
    const s = score();
    if (!quiz || s === undefined) {
      return;
    }

    savePlayHistory(quiz.quizName, s);
  });

  createEffect(() => {
    const { quiz, correctQuestions } = location.state || {};
    if (!quiz || !correctQuestions) {
      return null;
    }

    const score = correctQuestions.length / quiz.quizList.length;
    setScore(score);
  }, []);

  onMount(() => {
    const { quiz, correctQuestions } = location.state || {};
    if (!quiz || !correctQuestions) {
      navigate("/");
      return;
    }

    setLocationData({
      quiz,
      correctQuestions,
    });
  });

  return (
    <BaseTemplate>
      <Show
        when={locationData() !== undefined}
        fallback={<div>Loading...</div>}
      >
        <div class="flex items-center justify-center p-4 h-full">
          <div class="flex flex-col items-center">
            {badgeComp()}
            <h1
              class="text-5xl h-1/3 mt-4"
              style={{ "overflow-wrap": "anywhere" }}
            >
              {locationData()?.quiz.quizName}
            </h1>
            <span class="text-4xl h-1/3 mt-4">{`${
              locationData()?.correctQuestions.length
            } / ${locationData()?.quiz.quizList.length}`}</span>
            <A href="/" class="text-1xl font-bold mt-4 animate-bounce">
              GO BACK HOME
            </A>
          </div>
        </div>
      </Show>
    </BaseTemplate>
  );
};

export default Result;
