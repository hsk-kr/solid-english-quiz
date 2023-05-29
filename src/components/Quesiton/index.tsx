import { Component, Index } from "solid-js";

const Question: Component<{
  question: string;
  choices: string[];
  onAnswer: (index: number) => void;
}> = (props) => {
  return (
    <div style={{ "padding-top": "20%" }}>
      <div class="flex justify-center">
        <p
          class="text-center text-3xl"
          style={{
            "max-width": "80vw",
          }}
        >
          {props.question}
        </p>
      </div>
      <ul class="text-center mt-20 text-2xl flex flex-col items-center gap-y-4">
        <Index each={props.choices}>
          {(choice, index) => (
            <li
              class="bg-white rounded drop-shadow-md cursor-pointer hover:bg-slate-50 transition"
              style={{
                width: "300px",
                "max-width": "80vw",
              }}
              onClick={[props.onAnswer, index]}
            >
              {choice()}
            </li>
          )}
        </Index>
      </ul>
    </div>
  );
};

export default Question;
