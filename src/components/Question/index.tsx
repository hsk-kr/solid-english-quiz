import { Component, For } from "solid-js";
import KeyEvent, { Key } from "../../components/functions/KeyEvent";

const Question: Component<{
  question: string;
  choices: string[];
  onAnswer: (index: number) => void;
}> = (props) => {
  const handleKeyEvent = (key: Key) => {
    const index = Number(key) - 1;
    if (index >= props.choices.length) return;
    props.onAnswer(index);
  };

  const keysToDetect: Key[] = ["1", "2", "3", "4"];

  return (
    <>
      <KeyEvent keys={keysToDetect} onKeyUp={handleKeyEvent} />
      <div style={{ "padding-top": "20%" }} class="h-full">
        <div class="flex justify-center h-2/5">
          <p
            class="text-center text-1xl"
            style={{
              "max-width": "80vw",
            }}
          >
            {props.question}
          </p>
        </div>
        <ul class="text-center text-lg flex flex-col items-center gap-y-6">
          <For each={props.choices}>
            {(choice, index) => (
              <li
                class="bg-white rounded drop-shadow-md cursor-pointer hover:bg-slate-50 transition"
                style={{
                  width: "300px",
                  "max-width": "80vw",
                }}
                onClick={[props.onAnswer, index()]}
              >
                {index() + 1}. {choice}
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  );
};

export default Question;
