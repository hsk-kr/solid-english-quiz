import { Component, JSX } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "lime";
}

const Button: Component<ButtonProps> = (props) => {
  const newClass = () => {
    let className = "rounded-lg p-1 cursor-pointer";

    switch (props.color) {
      case "lime":
        className += " text-white bg-lime-500";
    }

    if (props.class) className += ` ${props.class}`;

    return className;
  };

  return <button {...props} class={newClass()} />;
};

export default Button;
