import { Component, JSXElement } from "solid-js";
import { font } from "../../../stores/fontSignal";

const BaseTemplate: Component<{
  children?: JSXElement;
}> = (props) => {
  return (
    <div class={`w-screen h-screenUI bg-lime-50 ${font()}`}>
      {props.children}
    </div>
  );
};

export default BaseTemplate;
