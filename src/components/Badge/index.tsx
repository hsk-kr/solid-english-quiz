import { Component, JSXElement, mergeProps } from "solid-js";

export type BadgeColor = "red" | "blue" | "green";

export type BadgeFontSize = "sm" | "md";

const Badge: Component<{
  color: BadgeColor;
  size?: BadgeFontSize;
  children?: JSXElement;
}> = (props) => {
  const mergedProps = mergeProps(
    {
      size: "sm" as BadgeFontSize,
    },
    props
  );
  // Map color and size values to Tailwind CSS classes
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
  };

  // Generate the dynamic classes based on the provided props
  const badgeClasses = `${colorClasses[mergedProps.color]} ${
    sizeClasses[mergedProps.size]
  } text-white font-medium rounded-full inline-block w-fit`;

  return <span class={badgeClasses}>{props.children}</span>;
};

export default Badge;
