import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import LoginPage from './features/Auth/loginpage';
import SignupPage from './features/Auth/components/signuppage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;