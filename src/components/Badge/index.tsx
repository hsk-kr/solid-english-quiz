import { Component, JSXElement, mergeProps } from "solid-js";

export type BadgeColor = "red" | "blue" | "green";

export type BadgeFontSize = "sm" | "md";

const Badge: Component<{
  color: BadgeColor;
  size?: BadgeFontSize;
  children?: JSXElement;
}> = (props) => {
  const mergedProps = mergeProps({ size: "md" }, props);

  return (
    <div
      class="p-4 rounded-lg text-white cursor-default"
      classList={{
        "p-2": mergedProps.size === "sm",
        "p-4": mergedProps.size === "md",
        "text-xs": mergedProps.size === "sm",
        "bg-red-700": mergedProps.color === "red",
        "bg-green-700": mergedProps.color === "green",
        "bg-blue-700": mergedProps.color === "blue",
      }}
    >
      {mergedProps.children}
    </div>
  );
};

export default Badge;
