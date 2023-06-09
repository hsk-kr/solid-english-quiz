import { onCleanup, Component, onMount } from "solid-js";

export type Key = "Enter" | "ArrowUp" | "ArrowDown" | "1" | "2" | "3" | "4";

const KeyEvent: Component<{
  keys: Key | Key[];
  onKeyUp?: (key: Key) => void;
}> = (props) => {
  onMount(() => {
    const handleWindowKeyEvent = (e: KeyboardEvent) => {
      const k = e.key as Key;

      if (props.keys.includes(k)) {
        props.onKeyUp?.(k);
      }
    };

    window.addEventListener("keyup", handleWindowKeyEvent);

    onCleanup(() => {
      window.removeEventListener("keyup", handleWindowKeyEvent);
    });
  });

  return null;
};

export default KeyEvent;
