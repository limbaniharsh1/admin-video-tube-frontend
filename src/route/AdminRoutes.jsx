import { routeConstants } from "../constants/routes";
import Home from "../Home";
import CategoriesPage from "../pages/category";

export const adminRoutes = [
  {
    PATH: routeConstants.HOME,
    COMPONENT: <Home />,
    NAME: "Home",
  },
  {
    PATH: routeConstants.CATEGORY,
    COMPONENT: <CategoriesPage />,
    NAME: "Category",
  },
];
