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
import CreateTopic from './components/TopicDetails/TopicCreate';
import AccompagnementUpdate from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Accompagnement/AccompagnementUpdate';
import CreateAccompagnement from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Accompagnement/AccompagnementCreate';
import FormationCreate from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Formations/FormationCreate';
import Accompagnements from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Accompagnement/Accompagnements';
import Activities from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Activity/Activities';
import ActivityCreate from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Activity/ActivityCreate';
import ActivityUpdate from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Activity/ActivityUpdate';
import Agendas from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Agenda/Agendas';
import AgendaCreate from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Agenda/AgendaCreate';
import AgendaUpdate from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Agenda/AgendaUpdate';
import DiscussionDetailsComponent from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Discussion/DiscussionDetailsComponent';
import Discussions from './components/BaladiyaAgent/CitizenPortal/PoliticSpace/Discussion/Discussions';
import Informations from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Information/Informations';
import InformationCreate from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Information/InformationCreate';
import InformationUpdate from './components/BaladiyaAgent/CitizenPortal/SocialSpace/Information/InformationUpdate';
import EconomicFormations from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Formations/Formations';
import EconomicFormationCreate from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Formations/FormationCreate';
import EconomicFormationUpdate from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Formations/FormationUpdate';
import EconomicAccompagnements from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Accompagnements/Accompagnements';
import CreateEconomicAccompagnement from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Accompagnements/AccompagnementCreate';
import EconomicAccompagnementUpdate from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/Accompagnements/AccompagnementUpdate';
import LocalPatronats from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/LocalPatronat/LocalPatronats';
import LocalPartonatCreate from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/LocalPatronat/LocalPatronatCreate';
import LocalPartonatUpdate from './components/BaladiyaAgent/CitizenPortal/EconomicSpace/LocalPatronat/LocalPatronatUpdate';
import EcologicalInformations from './components/BaladiyaAgent/CitizenPortal/EcologicalSpace/EcologicalInformations';
import EcologicalInformationCreate from './components/BaladiyaAgent/CitizenPortal/EcologicalSpace/EcologicalInformationCreate';
import EcologicalInformationUpdate from './components/BaladiyaAgent/CitizenPortal/EcologicalSpace/EcologicalInformationUpdate';
import CulturTopics from './components/BaladiyaAgent/CitizenPortal/CulturalSpace/CulturTopics';
import CulturTopicCreate from './components/BaladiyaAgent/CitizenPortal/CulturalSpace/CulturTopicCreate';
import CulturalTopicUpdate from './components/BaladiyaAgent/CitizenPortal/CulturalSpace/CulturTopicUpdate';
import AudienceDemands from './components/BaladiyaAgent/CitizenPortal/AudianceSpace/AudienceDemands';
import AudienceDemandCreate from './components/BaladiyaAgent/CitizenPortal/AudianceSpace/AudienceCreate';
import AudienceDemandUpdate from './components/BaladiyaAgent/CitizenPortal/AudianceSpace/AudienceDemandUpdate';
import Products from './components/BaladiyaAgent/CitizenPortal/EcommercialSpace/Products';
import ProductCreate from './components/BaladiyaAgent/CitizenPortal/EcommercialSpace/ProductCreate';
import ProductUpdate from './components/BaladiyaAgent/CitizenPortal/EcommercialSpace/ProductUpdate';
import Actualities from './components/BaladiyaAgent/Actuality/Actualities';
import ActualityCreate from './components/BaladiyaAgent/Actuality/ActualityCreate';
import ActualityUpdate from './components/BaladiyaAgent/Actuality/ActualityUpdate';
import Visits from './components/BaladiyaAgent/VisitSpace/Visits/Visits';
import VisitCreate from './components/BaladiyaAgent/VisitSpace/Visits/VisitCreate';
import VisitDetailsComponent from './components/BaladiyaAgent/VisitSpace/Visits/VisitUpdate';
import AlbumPhoto from './components/BaladiyaAgent/VisitSpace/AlbumPhoto/AlbumPhoto';
import AlbumCreate from './components/BaladiyaAgent/VisitSpace/AlbumPhoto/AlbumCreate';
import AlbumUpdate from './components/BaladiyaAgent/VisitSpace/AlbumPhoto/AlbumUpdate';
import Chat from './components/Chat';
import { BrowserRouter as Router,Routes, Route, useLocation } from 'react-router-dom';


const Routers = () => {

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
    const CreateTopicWithNavigation = WithNavigation(CreateTopic, false);
    const CreateFormationWithNavigation = WithNavigation(FormationCreate, false);
    const AccompagnementsWithNavigation = WithNavigation(Accompagnements, false);
    const CreateAccompagnementWithNavigation = WithNavigation(CreateAccompagnement, false);
    const AccompagnementUpdateWithNavigation = WithNavigation(AccompagnementUpdate, false);
    const ActivitiesWithNavigation = WithNavigation(Activities, false);
    const ActivityCreateWithNavigation = WithNavigation(ActivityCreate, false);
    const ActivityUpdateWithNavigation = WithNavigation(ActivityUpdate, false);
    const AgendasWithNavigation = WithNavigation(Agendas, false);
    const AgendaCreateWithNavigation = WithNavigation(AgendaCreate, false);
    const AgendaUpdateWithNavigation = WithNavigation(AgendaUpdate, false);
    const DiscussionsWithNavigation = WithNavigation(Discussions, false);
    const DiscussionDetailsWithNavigation = WithNavigation(DiscussionDetailsComponent, false);
    const InformationsWithNavigation = WithNavigation(Informations, false);
    const InformationCreateWithNavigation = WithNavigation(InformationCreate, false);
    const InformationUpdateWithNavigation = WithNavigation(InformationUpdate, false);
    const EconomicFormationsWithNavigation = WithNavigation(EconomicFormations, false);
    const EconomicFormationCreateWithNavigation = WithNavigation(EconomicFormationCreate, false);
    const EconomicFormationUpdateWithNavigation = WithNavigation(EconomicFormationUpdate, false);
    const EconomicAccompagnementsWithNavigation = WithNavigation(EconomicAccompagnements, false);
    const EconomicAccompagnementCreateWithNavigation = WithNavigation(CreateEconomicAccompagnement, false);
    const EconomicAccompagnementUpdateWithNavigation = WithNavigation(EconomicAccompagnementUpdate, false);
    const LocalPatronatsWithNavigation = WithNavigation(LocalPatronats, false);
    const LocalPatronatCreateWithNavigation = WithNavigation(LocalPartonatCreate, false);
    const LocalPatronatUpdateWithNavigation = WithNavigation(LocalPartonatUpdate, false);
    const EcologicalInformationsWithNavigation = WithNavigation(EcologicalInformations, false);
    const EcologicalInformationCreateWithNavigation = WithNavigation(EcologicalInformationCreate, false);
    const EcologicalInformationUpdateWithNavigation = WithNavigation(EcologicalInformationUpdate, false);
    const CulturTopicsWithNavigation = WithNavigation(CulturTopics, false);
    const CulturTopicCreateWithNavigation = WithNavigation(CulturTopicCreate, false);
    const CulturTopicUpdateWithNavigation = WithNavigation(CulturalTopicUpdate, false);
    const AudienceDemandsWithNavigation = WithNavigation(AudienceDemands, false);
    const AudienceDemandCreateWithNavigation = WithNavigation(AudienceDemandCreate, false);
    const AudienceDemandUpdateWithNavigation = WithNavigation(AudienceDemandUpdate, false);
    const ProductsWithNavigation = WithNavigation(Products, false);
    const ProductCreateWithNavigation = WithNavigation(ProductCreate, false);
    const ProductUpdateWithNavigation = WithNavigation(ProductUpdate, false);
    const ActualitiesWithNavigation = WithNavigation(Actualities, false);
    const ActualityCreateWithNavigation = WithNavigation(ActualityCreate, false);
    const ActualityUpdateWithNavigation = WithNavigation(ActualityUpdate, false);
    const VisitsWithNavigation = WithNavigation(Visits, false);
    const VisitCreateWithNavigation = WithNavigation(VisitCreate, false);
    const VisitUpdateWithNavigation = WithNavigation(VisitDetailsComponent, false);
    const AlbumsWithNavigation = WithNavigation(AlbumPhoto, false);
    const AlbumCreateWithNavigation = WithNavigation(AlbumCreate, false);
    const AlbumUpdateWithNavigation = WithNavigation(AlbumUpdate, false);

    
  return (
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
          <Route path="/topic" element={<CreateTopicWithNavigation />} />
          <Route path="/formation" element={<CreateFormationWithNavigation />} />
          <Route path="/accompagnements" element={<AccompagnementsWithNavigation />} />
          <Route path="/accompagnements/:id" element={<AccompagnementUpdateWithNavigation />} />
          <Route path="/accompagnement" element={<CreateAccompagnementWithNavigation />} />
          <Route path="/politic_activities" element={<ActivitiesWithNavigation />} />
          <Route path="/activity" element={<ActivityCreateWithNavigation />} />
          <Route path="/activities/:id" element={<ActivityUpdateWithNavigation />} />
          <Route path="/agendas" element={<AgendasWithNavigation />} />
          <Route path="/agenda" element={<AgendaCreateWithNavigation/>} />
          <Route path="/agendas/:id" element={<AgendaUpdateWithNavigation />} />
          <Route path="/discussions" element={<DiscussionsWithNavigation />} />
          <Route path="/discussions/:id" element={<DiscussionDetailsWithNavigation />} />
          <Route path="social_informations" element={<InformationsWithNavigation />} />
          <Route path="social_information" element={<InformationCreateWithNavigation />} />
          <Route path="/informations/:id" element={<InformationUpdateWithNavigation/>} />
          <Route path="/economic_formations" element={<EconomicFormationsWithNavigation/>} />
          <Route path="/economic_formation" element={<EconomicFormationCreateWithNavigation/>} />
          <Route path="/economic_formations/:id" element={<EconomicFormationUpdateWithNavigation/>} />
          <Route path="/economic_accompagnements" element={<EconomicAccompagnementsWithNavigation/>} />
          <Route path="/economic_accompagnement" element={<EconomicAccompagnementCreateWithNavigation/>} />
          <Route path="/economic_accompagnements/:id" element={<EconomicAccompagnementUpdateWithNavigation/>} />
          <Route path="/local_patronats" element={<LocalPatronatsWithNavigation/>} />
          <Route path="/local_patronat" element={<LocalPatronatCreateWithNavigation/>} />
          <Route path="/local_patronats/:id" element={<LocalPatronatUpdateWithNavigation/>} />  
          <Route path="/ecological_informations" element={<EcologicalInformationsWithNavigation/>} />
          <Route path="/ecological_information" element={<EcologicalInformationCreateWithNavigation/>} />
          <Route path="/ecological_informations/:id" element={<EcologicalInformationUpdateWithNavigation/>} />
          <Route path="/cultural_topics" element={<CulturTopicsWithNavigation/>} /> 
          <Route path="/cultural_topic" element={<CulturTopicCreateWithNavigation/>} /> 
          <Route path="/cultural_topics/:id" element={<CulturTopicUpdateWithNavigation/>} />
          <Route path="/audience_demands" element={<AudienceDemandsWithNavigation/>} /> 
          <Route path="/audience_demand" element={<AudienceDemandCreateWithNavigation/>} /> 
          <Route path="/audience_demands/:id" element={<AudienceDemandUpdateWithNavigation/>} /> 
          <Route path="/products" element={<ProductsWithNavigation/>} /> 
          <Route path="/product" element={<ProductCreateWithNavigation/>} /> 
          <Route path="/products/:id" element={<ProductUpdateWithNavigation/>} />
          <Route path="/actualities" element={<ActualitiesWithNavigation/>} />
          <Route path="/actuality" element={<ActualityCreateWithNavigation/>} />
          <Route path="/actualities/:id" element={<ActualityUpdateWithNavigation/>} />
          <Route path="/visits" element={<VisitsWithNavigation/>} />
          <Route path="/visit" element={<VisitCreateWithNavigation/>} />
          <Route path="/visits/:id" element={<VisitUpdateWithNavigation/>} />
          <Route path="/albums" element={<AlbumsWithNavigation/>} /> 
          <Route path="/album" element={<AlbumCreateWithNavigation/>} /> 
          <Route path="/albums/:id" element={<AlbumUpdateWithNavigation/>} />
          <Route path='/chat'  element={<Chat/>} /> 
        </Routes>

  );
};

export default Routers;