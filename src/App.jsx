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
import JobList from './features/employer/joblist';
import JobModify from './features/employer/jobmodify';
import Resetpassword from './features/Auth/resetpassword';
import ResetPasswordConfirm from "./features/Auth/resetpasswordconfirm.jsx";
import AddProfile from "./features/profile/AddProfile";
import NoiDungHoSoPage from "./features/profile/NoiDungHoSoPage";
import AdminLogin from "./features/Auth/adminloginpage";
import ProtectedAdminRoute from './features/Auth/components/ProtectedAdminRoute';
import JobDetail from './features/admin/JobDetail.jsx';
import PersonalInfo from './features/profile/PersonalInfo.jsx';
import Jobdetailpage from './pages/jobdetailpage';
import ApplyPage from './pages/ApplyPage';
import AppliedJob from './features/Applied/AppliedJob.jsx';
import AppliedCheck from './features/employer/AppliedCheck.jsx';
import AppliedDetail from "./features/employer/AppliedDetail.jsx";
import SavedJob from './features/savedjob/savedjob.jsx';
import ThongBaoPage from "./pages/ThongBaoPage";
import NotificationBell from "./components/NotificationBell";
import ThongBao from './features/admin/thongbao.jsx';
import CreateResume from './features/profile/CreateResume.jsx';
import ViewCV from './features/profile/ViewCV.jsx';
import EditCV from './features/profile/EditResume.jsx';
import Recommend from './pages/recommend.jsx';
import AddCertification from './features/profile/AddCertification.jsx';
import ViewUploadCertification from './features/profile/ViewUploadCertification.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/employer" element={<Employerpage />} />
        <Route path="jobdetail/:id" element={<Jobdetailpage />} />
        <Route path="/apply/:id" element={<ApplyPage />} />
        <Route path="/applied-jobs" element={<AppliedJob />} />
        <Route path="/saved-jobs" element={<SavedJob />} />
        <Route path="/recommended-jobs" element={<Recommend />} />
        <Route path="/add-certification" element={<AddCertification />} />

        <Route path="/thong-bao" element={<ThongBaoPage />} />


        {/* <Route path="/job/:id" element={<JobDetailPage />} /> */}
        <Route path="/job/:id" element={<JobModify />} />
        <Route path="/jobcreate" element={<CompanyPostJob />} />
        <Route path="/profile" element={<Profilemange />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/noidung/:ndid" element={<NoiDungHoSoPage />} />
        <Route path="/viewresume/:id" element={<ViewCV />} />
        <Route path="/edit-cv/:id" element={<EditCV />} />
<Route path="/view-upload-certification/:id" element={<ViewUploadCertification />} />

        <Route path="/createresume" element={<CreateResume />} />

        <Route path="/reset" element={<Resetpassword />} />
        <Route path="/resetpassword/confirm" element={<ResetPasswordConfirm />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Nested routes for admin */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<Adminpage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employers" element={<Employerhandle />} />
            <Route path="jobs" element={<Jobhandle />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="reports" element={<Reporthandle />} />
            <Route path="linhvuc" element={<Linhvuc />} />
            <Route path="company" element={<Company />} />
            <Route path="companydetail/:id" element={<CompanyDetail />} />
            <Route path="bangcap" element={<Bangcap />} />
            <Route path="chucdanh" element={<Chucdanh />} />
            <Route path="kinhnghiem" element={<Kinhnghiem />} />
            <Route path="loaihinh" element={<LoaiHinhLamViec />} />
            <Route path="vitri" element={<ViTri />} />
            <Route path="thong-bao" element={<ThongBao />} />
          </Route>
        </Route>

        <Route path="/employer/login" element={<Employerloginpage />} />
        <Route path="/employer/register" element={<Employersignuppage />} />
        <Route path="/employer/info" element={<EmployerInfoPage />} />
        <Route path="/employer/company" element={<EmployerCompany />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/applied/:tinId" element={<AppliedCheck />} />
        <Route path="/applied-detail/:utid" element={<AppliedDetail />} />



      </Routes>
    </Router>
  );
}

export default App;