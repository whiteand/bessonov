import { Route, Routes } from "solid-app-router";
import { Component, lazy } from "solid-js";

const Homepage = lazy(() => import("./pages/Homepage"));

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:all" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default App;
