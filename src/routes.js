import Dashboard from "layouts/dashboard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Applicants from "layouts/Applicants";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Schedule from "layouts/Schedule";
import ScheduleIcon from '@mui/icons-material/Schedule';
import Orders from "layouts/Orders";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Settings from "layouts/Settings";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Assessments from "layouts/Assessments";
import SignIn from "layouts/authentication/sign-in";
import BiotechIcon from '@mui/icons-material/Biotech';
import CourseQuestions from "layouts/CourseQuestions";
import Courses from "layouts/Courses";

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
    name: "Applicants",
    key: "applicants",
    route: "/applicants",
    icon: <PeopleAltIcon size="12px" />,
    component: <Applicants />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <MenuBookIcon size="12px" />,
    component: <Courses />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Schedule",
    key: "schedule",
    route: "/schedule",
    icon: <ScheduleIcon size="12px" />,
    component: <Schedule />,
    noCollapse: true,
    protected: false,
    sidebar:true
  }
  ,
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    route: "/orders",
    icon: <LocalMallIcon size="12px" />,
    component: <Orders />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Assessments",
    key: "assessments",
    route: "/assessments",
    icon: <BiotechIcon size="12px" />,
    component: <Assessments />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Course Questions",
    key: "questions",
    route: "/questions",
    icon: <BiotechIcon size="12px" />,
    component: <CourseQuestions />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    route: "/setting",
    icon: <ManageAccountsIcon size="12px" />,
    component: <Settings />,
    noCollapse: true,
    protected: false,
    sidebar:true
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: null,
    component: <SignIn />,
    noCollapse: true,
  },
];

export default routes;