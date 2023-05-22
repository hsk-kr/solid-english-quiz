import { Route, Router, Routes } from "@solidjs/router";
import Intro from "./pages/Intro";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Intro} />
        <Route path="/quiz" component={Quiz} />
        <Route path="*" component={NotFound} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
