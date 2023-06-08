import { onCleanup } from "solid-js";

const PreventDoubleTab = () => {
  const preventDefault = (e: MouseEvent) => {
    e.preventDefault();
  };
  document.addEventListener("dblclick", preventDefault);

  onCleanup(() => {
    document.removeEventListener("dblclick", preventDefault);
  });

  return null;
};

export default PreventDoubleTab;
