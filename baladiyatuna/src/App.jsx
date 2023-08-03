import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ForgetPassword/ResetPassword';
import ManageUSers from './components/BaladiyaAgent/ManageUsers/ManageUsers';
import ManageAgents from './components/Admin/ManageAgents/ManageAgents';
import Profile from './components/Profile/Profile';
import Home from './components/BaladiyaAgent/Home/Home';
import ChangePassword from './components/PasswordChange/PasswordChange';
import WithNavigation from './components/Navigator/WithNavigation'
import CitizenPortalData from './components/BaladiyaAgent/CitizenPortal/CitizenPortalData';
import Topics from './components/BaladiyaAgent/CitizenPortal/SportSpace/SportTopics';
import Formations from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Formations/Formations';
import TopicDetailsComponent from './components/TopicDetails/TopicDetailsComponent';
import FormationDetailsComponent from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Formations/FormationDetailsComponent';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

function App() {
  const SignUpWithNavigation = WithNavigation(SignUp, true);
  const LoginWithNavigation = WithNavigation(Login, true);
  const ResetPasswordWithNavigation = WithNavigation(ResetPassword,true);
  const ForgetPasswordWithNavigation = WithNavigation(ForgetPassword, true);
  const ManageUSersWithNavigation = WithNavigation(ManageUSers,false);
  const ManageAgentsWithNavigation = WithNavigation(ManageAgents,false);
  const ProfileWithNavigation = WithNavigation(Profile,false);
  const HomeWithNavigation = WithNavigation(Home,false);
  const ChangePasswordWithNavigation = WithNavigation(ChangePassword, false);
  const CitizePortalWithNavigation = WithNavigation(CitizenPortalData, false);
  const SportTopicsWithNavigation = WithNavigation(Topics, false);
  const TopicDetailsWithNavigation = WithNavigation(TopicDetailsComponent, false);
  const PoliticFormationWithNavigation = WithNavigation(Formations, false);
  const PoliticFormationDetailsWithNavigation = WithNavigation(FormationDetailsComponent, false);


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/forget_password" element={<ForgetPasswordWithNavigation />} />
          <Route path="/register" element={<SignUpWithNavigation />} />
          <Route path="/" element={<LoginWithNavigation />} />
          <Route path="/reset_password" element={<ResetPasswordWithNavigation />} />
          <Route path="/manage_users" element={<ManageUSersWithNavigation />} />
          <Route path="/manage_agents" element={<ManageAgentsWithNavigation />} />
          <Route path="/profile" element={<ProfileWithNavigation />} />
          <Route path="/home" element={<HomeWithNavigation />} />
          <Route path="/change_password" element={<ChangePasswordWithNavigation />} />
          <Route path="/citizen_portal" element={<CitizePortalWithNavigation />} />
          <Route path="/sport_topics" element={<SportTopicsWithNavigation />} />
          <Route path="/topics/:id" element={<TopicDetailsWithNavigation />} />
          <Route path="/formations" element={<PoliticFormationWithNavigation />} />
          <Route path="/formations/:id" element={<PoliticFormationDetailsWithNavigation />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
