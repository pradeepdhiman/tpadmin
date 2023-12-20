
import Dashboard from "layouts/dashboard";
import Home from "layouts/home";
import CourseDetail from "layouts/courses/components/Course-detail";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';
import Courses from "layouts/courses";
import MyCourses from "layouts/mycourses";
import Aboutus from "layouts/aboutus";
import PrivacyPolicy from "layouts/Privacypolicy";
import Contactus from "layouts/contactus";
import Faq from "layouts/faq";
import Study from "layouts/study";
import Overview from "layouts/profile";
import Assessment from "layouts/assessment";
import AssessmentTest from "layouts/assessmentTest";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "My Courses",
    key: "mycourses",
    route: "/dashboard/mycourses",
    icon: <LibraryBooksIcon size="12px" />,
    component: <MyCourses />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Study",
    key: "study",
    route: "/dashboard/study",
    icon: <VideoFileIcon size="12px" />,
    component: <Study/>,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/dashboard/profile",
    icon: <PersonIcon size="12px" />,
    component: <Overview/>,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Assessment",
    key: "assessment",
    route: "/dashboard/assessment",
    icon: <QuizIcon size="12px" />,
    component: <Assessment/>,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Assessment",
    key: "assessment",
    route: "/dashboard/assessment/:courseid",
    icon: <QuizIcon size="12px" />,
    component: <AssessmentTest/>,
    noCollapse: true,
    protected: false,
    sidebar:false
  },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <HomeIcon size="12px" />,
    component: <Home />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <AutoStoriesIcon size="12px" />,
    component: <Courses />,
    noCollapse: true,
    protected: false,
  },
  {
    type: "collapse",
    name: "Course Detail",
    key: "course-detail",
    route: "/courses/:id", 
    icon: <DashboardIcon size="12px" />,
    component: <CourseDetail />, 
    noCollapse: true,
    protected: false,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <LoginIcon size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon:"",
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "About us",
    key: "about-us",
    route: "/aboutus",
    icon:"",
    component: <Aboutus/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Privacy Policy",
    key: "privacy-policy",
    route: "/privacypolicy",
    icon:"",
    component: <PrivacyPolicy/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Contect Us",
    key: "contect-us",
    route: "/contectus",
    icon:"",
    component: <Contactus/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Faq",
    key: "faq",
    route: "/faq",
    icon:"",
    component: <Faq/>,
    noCollapse: true,
  },
];

export default routes;
