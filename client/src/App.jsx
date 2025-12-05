import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ExploreNature from "./pages/ExploreNature";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Games from "./pages/student/Games";
import Lessons from "./pages/student/Lessons";
import AI from "./pages/student/AI";
import Profile from "./pages/student/Profile";
import Leaderboard from "./pages/student/Leaderboard";
import UploadAssignment from "./pages/student/UploadAssignment";
import ChangePassword from "./pages/student/ChangePassword";
import SaveTheTreesGame from "./pages/student/SaveTheTreesGame";
import EcoQuestAdventure from "./pages/student/EcoQuestAdventure";
import OceanCleanupHero from "./pages/student/OceanCleanupHero";
import SolarPowerMaster from "./pages/student/SolarPowerMaster";
import RecyclingWizard from "./pages/student/RecyclingWizard";
import WindFarmEngineer from "./pages/student/WindFarmEngineer";
import MountainRanger from "./pages/student/MountainRanger";
import AquaticLifeGuardian from "./pages/student/AquaticLifeGuardian";
import GlobalWeatherDetective from "./pages/student/GlobalWeatherDetective";
import ElectricVehicleCity from "./pages/student/ElectricVehicleCity";
import EcoLab from "./pages/student/EcoLab";
import ClassManagement from "./pages/teacher/ClassManagement";
import StudentProgressTracking from "./pages/teacher/StudentProgressTracking";
import AssignmentCreation from "./pages/teacher/AssignmentCreation";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import StudentManagement from "./pages/teacher/StudentManagement";
import AssignmentSubmissions from "./pages/teacher/AssignmentSubmissions";
import VideoGeneration from "./pages/teacher/VideoGeneration";

// Admin module imports
import AdminLogin from "./pages/admin/AdminLogin";
import UserManagement from "./pages/admin/UserManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";
import AIVideos from "./pages/admin/AIVideos";
import Courses from "./pages/admin/Courses";
import SyllabusVideoGenerator from "./pages/admin/SyllabusVideoGenerator";
import GameManagement from "./pages/admin/GameManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore-nature" element={<ExploreNature />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student/games" element={<Games />} />
          <Route path="/student/lessons" element={<Lessons />} />
          <Route path="/student/upload-assignment" element={<UploadAssignment />} />
          <Route path="/student/change-password" element={<ChangePassword />} />
          <Route path="/student/ai" element={<AI />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/leaderboard" element={<Leaderboard />} />
          <Route path="/student/save-the-trees" element={<SaveTheTreesGame />} />
          <Route path="/student/ecoquest-adventure" element={<EcoQuestAdventure />} />
          <Route path="/student/ocean-cleanup-hero" element={<OceanCleanupHero />} />
          <Route path="/student/solar-power-master" element={<SolarPowerMaster />} />
          <Route path="/student/recycling-wizard" element={<RecyclingWizard />} />
          <Route path="/student/wind-farm-engineer" element={<WindFarmEngineer />} />
          <Route path="/student/mountain-ranger" element={<MountainRanger />} />
          <Route path="/student/aquatic-life-guardian" element={<AquaticLifeGuardian />} />
          <Route path="/student/global-weather-detective" element={<GlobalWeatherDetective />} />
          <Route path="/student/electric-vehicle-city" element={<ElectricVehicleCity />} />
          <Route path="/student/eco-lab" element={<EcoLab />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/classes" element={<ClassManagement />} />
          <Route path="/teacher/students" element={<StudentProgressTracking />} />
          <Route path="/teacher/student-management" element={<StudentManagement />} />
          <Route path="/teacher/assignments" element={<AssignmentCreation />} />
          <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
          <Route path="/teacher/video-generation" element={<VideoGeneration />} />
          <Route path="/teacher/assignment/:assignmentId/submissions" element={<AssignmentSubmissions />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />
          <Route path="/admin/ai-videos" element={<AIVideos />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/syllabus-video" element={<SyllabusVideoGenerator />} />
          <Route path="/admin/game-management" element={<GameManagement />} />
          <Route path="/teacher/student-management" element={<StudentManagement />} />
          <Route path="/teacher/assignment/:assignmentId/submissions" element={<AssignmentSubmissions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
