import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/common.css"
import { AuthProvider } from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import ResultPage from "./pages/ResultPage"
import SharePage from "./pages/SharePage"
import TestResultPage from "./pages/TestResultPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/test-result" element={<TestResultPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
