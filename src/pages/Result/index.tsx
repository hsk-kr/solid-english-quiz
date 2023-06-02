import { A, useLocation, useNavigate } from "@solidjs/router";
import BaseTemplate from "../../components/templates/BaseTemplate";
import quizzesData from "../../data/quizzes";
import { Show, createSignal, onMount } from "solid-js";
import Badge from "../../components/Badge";

const Result = () => {
  type LocationState = {
    quiz: (typeof quizzesData)[0];
    correctQuestions: (typeof quizzesData)[0]["quizList"];
  };
  const navigate = useNavigate();
  const [locationData, setLocationData] = createSignal<LocationState>();
  const location = useLocation<LocationState>();
  const badgeComp = () => {
    const { quiz, correctQuestions } = location.state || {};
    if (!quiz || !correctQuestions) {
      return null;
    }

    const w = correctQuestions.length / quiz.quizList.length;
    if (w === 1) {
      return <Badge color="blue">PERFECT!</Badge>;
    } else if (w >= 0.6) {
      return <Badge color="green">GOOD!</Badge>;
    } else {
      return <Badge color="red">PRACTICE!</Badge>;
    }
  };

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
        <div class="flex flex-col items-center text-center p-4 h-full max-h-96">
          {badgeComp()}
          <h1
            class="text-5xl h-1/3 mt-4"
            style={{ "overflow-wrap": "anywhere" }}
          >
            {locationData()?.quiz.quizName}
          </h1>
          <span class="text-6xl h-1/3">{`${
            locationData()?.correctQuestions.length
          } / ${locationData()?.quiz.quizList.length}`}</span>
          <A href="/" class="text-1xl font-bold">
            GO BACK HOME
          </A>
        </div>
      </Show>
    </BaseTemplate>
  );
};

export default Result;
