import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import LoginPage from './features/Auth/loginpage';
import SignupPage from './features/Auth/signuppage';
import SearchResultPage from './features/jobsearch/searchresult';
import Employerpage from './pages/employerpage';
import Adminpage from './pages/adminpage';
import Employerhandle from './features/admin/employerhandle';
import Dashboard from './features/admin/dashboard';
import Jobhandle from './features/admin/jobhandle';
import Reporthandle from './features/admin/reporthandle';
import JobDetailPage from './pages/jobdetailpage';
import Employerloginpage from './features/Auth/employerloginpage';
import Employersignuppage from './features/Auth/employersignuppage';
import EmployerInfoPage from './features/Auth/EmployerInfoPage';
import Linhvuc from './features/admin/linhvuc';
import EmployerCompany from './features/employer/company';
import Company from './features/admin/company';
import CompanyDetail from './features/admin/companydetail';
import Bangcap from './features/admin/bangcap';
import Chucdanh from './features/admin/chucdanh';
import Kinhnghiem from './features/admin/kinhnghiem';
import LoaiHinhLamViec from './features/admin/loaihinh';
import ViTri from './features/admin/vitri';
import CompanyPostJob from './features/employer/jobcreate';
import Profilemange from './features/profile/profilemange';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/employer" element={<Employerpage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/jobcreate" element={<CompanyPostJob />} />
        <Route path="/profile" element={<Profilemange />} />
        {/* Nested routes for admin */}
        <Route path="/admin" element={<Adminpage />}>
          <Route path="employers" element={<Employerhandle />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<Jobhandle />} />
          <Route path="reports" element={<Reporthandle />} />
          <Route path="linhvuc" element={<Linhvuc />} />
          <Route path="company" element={<Company />} />
          <Route path="companydetail/:id" element={<CompanyDetail />} />
          <Route path="bangcap" element={<Bangcap />} />
          <Route path="chucdanh" element={<Chucdanh />} />
          <Route path="kinhnghiem" element={<Kinhnghiem />} />
          <Route path="loaihinh" element={<LoaiHinhLamViec />} />
          <Route path="vitri" element={<ViTri />} />
        </Route>

        <Route path="/employer/login" element={<Employerloginpage />} />
        <Route path="/employer/register" element={<Employersignuppage />} />
        <Route path="/employer/info" element={<EmployerInfoPage />} />
        <Route path="/employer/company" element={<EmployerCompany />} />
      </Routes>
    </Router>
  );
}

export default App;