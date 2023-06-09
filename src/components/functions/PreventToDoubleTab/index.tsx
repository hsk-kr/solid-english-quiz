import { onCleanup, onMount } from "solid-js";

const PreventDoubleTab = () => {
  onMount(() => {
    const preventDefault = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("dblclick", preventDefault);

    onCleanup(() => {
      document.removeEventListener("dblclick", preventDefault);
    });
  });

  return null;
};

export default PreventDoubleTab;
