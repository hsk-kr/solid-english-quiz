import { Component, JSXElement, createEffect } from "solid-js";
import fontSignal from "../../../stores/fontSignal";

const BaseTemplate: Component<{
  center?: boolean;
  children?: JSXElement;
}> = (props) => {
  const [font] = fontSignal;

  return (
    <div class={`w-screen h-screen bg-lime-50 ${font()}`}>{props.children}</div>
  );
};

export default BaseTemplate;
