import type { Component } from "solid-js";
import MainRouter from "./MainRouter";
import PreventDoubleTab from "./components/functions/PreventToDoubleTab";

const App: Component = () => {
  return (
    <>
      <PreventDoubleTab />
      <MainRouter />
    </>
  );
};

export default App;
