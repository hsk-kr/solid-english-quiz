import { Component } from "solid-js";

const TopProgressBar: Component<{
  value: number;
  max: number;
}> = (props) => {
  const progressBarWidth = () =>
    Math.floor((props.value / props.max) * 100) + "%";

  const label = () => `${props.value} / ${props.max}`;

  return (
    <div class="fixed bg-sky-50 md:h-14 h-6 text-center top-0 left-0 right-0">
      <div
        class="absolute left-0 top-0 bottom-0 bg-sky-500 z-0"
        style={{
          width: progressBarWidth(),
        }}
      ></div>
      <div class="absolute left-0 top-0 bottom-0 right-0 flex justify-center items-center z-10">
        <span class="z-10 md:text-xl">{label()}</span>
      </div>
    </div>
  );
};

export default TopProgressBar;
