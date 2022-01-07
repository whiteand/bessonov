import { Route, Routes } from "solid-app-router";
import { Component, lazy } from "solid-js";

const Homepage = lazy(() => import("./pages/Homepage"));
const CreateTable = lazy(() => import("./pages/CreateTable"));

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/:all" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default App;
