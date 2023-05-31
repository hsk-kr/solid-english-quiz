import { A, useLocation, useNavigate } from "@solidjs/router";
import BaseTemplate from "../../components/templates/BaseTemplate";
import quizzesData from "../../data/quizzes";
import { Show, createSignal, onMount } from "solid-js";

const Result = () => {
  type LocationState = {
    quiz: (typeof quizzesData)[0];
    correctQuestions: (typeof quizzesData)[0]["quizList"];
  };
  const navigate = useNavigate();
  const [locationData, setLocationData] = createSignal<LocationState>();
  const location = useLocation<LocationState>();

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
        <h1>{locationData()?.quiz.quizName}</h1>
        <span>{`${locationData()?.correctQuestions.length} / ${
          locationData()?.quiz.quizList.length
        }`}</span>
        <A href="/">GO BACK HOME</A>
      </Show>
    </BaseTemplate>
  );
};

export default Result;
