import { onCleanup, Component, createEffect } from "solid-js";

const Enter: Component<{
  onEnter?: VoidFunction;
}> = (props) => {
  const handleWindowKeyEvent = (e: KeyboardEvent) => {
    if (e.key === "Enter" && props.onEnter) {
      props.onEnter();
    }
  };

  window.addEventListener("keyup", handleWindowKeyEvent);

  onCleanup(() => {
    window.removeEventListener("keyup", handleWindowKeyEvent);
  });

  return null;
};

export default Enter;
