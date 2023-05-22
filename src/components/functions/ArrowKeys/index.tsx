import { onCleanup, Component, createEffect } from "solid-js";

const ArrowKeys: Component<{
  onUp?: VoidFunction;
  onDown?: VoidFunction;
}> = (props) => {
  const handleWindowKeyEvent = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" && props.onUp) {
      props.onUp();
    } else if (e.key === "ArrowDown" && props.onDown) {
      props.onDown();
    }
  };

  window.addEventListener("keyup", handleWindowKeyEvent);

  onCleanup(() => {
    window.removeEventListener("keyup", handleWindowKeyEvent);
  });

  return null;
};

export default ArrowKeys;
