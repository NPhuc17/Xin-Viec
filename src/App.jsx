import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import LoginPage from './features/Auth/loginpage';
import SignupPage from './features/Auth/signuppage';
import SearchResultPage from './features/jobsearch/searchresult';
import Employerpage from './pages/employerpage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/searched-jobs" element={<SearchResultPage />} />
         <Route path="/employer" element={<Employerpage />} />
      </Routes>
    </Router>
  );
}

export default App;