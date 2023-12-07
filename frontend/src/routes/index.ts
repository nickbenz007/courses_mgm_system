import { lazy } from "react";
import CreateUser from "../components/CreateUser";
import AllUsers from "../components/AllUsers";
import UpdateUserModal from "../components/UpdateUserModal";
import AssignCourse from "../components/AssignCourse";
import CreateCourse from "../components/CreateCourse";
import AllCourses from "../components/AllCourses";
import Teachers from "../components/Teachers";

const Calendar = lazy(() => import("../pages/Calendar"));
const Chart = lazy(() => import("../pages/Chart"));
const FormElements = lazy(() => import("../pages/Form/FormElements"));
const FormLayout = lazy(() => import("../pages/Form/FormLayout"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Tables = lazy(() => import("../pages/Tables"));
const Alerts = lazy(() => import("../pages/UiElements/Alerts"));
const Buttons = lazy(() => import("../pages/UiElements/Buttons"));

const coreRoutes = [
  {
    path: "/calendar",
    title: "Calender",
    component: Calendar,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/create-user",
    title: "Create User",
    component: CreateUser,
  },
  {
    path: "/all-users",
    title: "All Users",
    component: AllUsers,
  },
  {
    path: "/update-user",
    title: "Update User",
    component: UpdateUserModal,
  },
  {
    path: "/create-course",
    title: "Create Course",
    component: CreateCourse,
  },
  {
    path: "/courses",
    title: "Courses",
    component: AllCourses,
  },
  {
    path: "/assign-course",
    title: "Assign Course",
    component: AssignCourse,
  },
  {
    path: "/teachers",
    title: "Teachers",
    component: Teachers,
  },
  {
    path: "/forms/form-elements",
    title: "Forms Elements",
    component: FormElements,
  },
  {
    path: "/forms/form-layout",
    title: "Form Layouts",
    component: FormLayout,
  },
  {
    path: "/tables",
    title: "Tables",
    component: Tables,
  },
  {
    path: "/settings",
    title: "Settings",
    component: Settings,
  },
  {
    path: "/chart",
    title: "Chart",
    component: Chart,
  },
  {
    path: "/ui/alerts",
    title: "Alerts",
    component: Alerts,
  },
  {
    path: "/ui/buttons",
    title: "Buttons",
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
