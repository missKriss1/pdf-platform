import { Route, Routes } from "react-router-dom";
import HomePage from "@/container/HomePage/HomePage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not found</h1>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
        <Toaster />
    </>
  );
}

export default App;
