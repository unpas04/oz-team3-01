import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/common.css"
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import ResultPage from "./pages/ResultPage"
import SharePage from "./pages/SharePage"
import TestResultPage from "./pages/TestResultPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/share" element={<SharePage />} />
      <Route path="/test-result" element={<TestResultPage />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
