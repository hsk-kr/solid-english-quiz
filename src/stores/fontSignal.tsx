import { Accessor, Setter, createEffect, createSignal } from "solid-js";

type Font = "font-caveat" | "font-roboto";

const defaultFont: Font = "font-caveat";
const STORAGE_FONT = "STORAGE_FONT";

const fontSignal = ((): [Accessor<Font>, Setter<Font>, VoidFunction] => {
  const initFont: Font =
    (localStorage.getItem(STORAGE_FONT) as Font) || defaultFont;
  const [font, setFont] = createSignal<Font>(initFont);

  const nextFont = () => {
    let newFont: Font = "font-caveat";

    switch (font()) {
      case "font-caveat":
        newFont = "font-roboto";
        break;
    }

    localStorage.setItem(STORAGE_FONT, newFont);
    setFont(newFont);
  };

  createEffect(() => {
    const rootElement = document.querySelector<HTMLElement>(":root");

    switch (font()) {
      case "font-caveat":
        rootElement?.style.setProperty("font-size", "150%");
        break;
      case "font-roboto":
        rootElement?.style.setProperty("font-size", "100%");
        break;
    }
  });

  return [font, setFont, nextFont];
})();

export default fontSignal;
