import { Route, Routes } from "react-router-dom";
import HomePage from "@/container/HomePage/HomePage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not found</h1>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
