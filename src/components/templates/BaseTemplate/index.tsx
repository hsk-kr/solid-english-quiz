import { Component, JSXElement } from "solid-js";

const BaseTemplate: Component<{
  center?: boolean;
  children?: JSXElement;
}> = (props) => {
  return (
    <div class="w-screen h-screen bg-lime-50 font-caveat">{props.children}</div>
  );
};

export default BaseTemplate;
