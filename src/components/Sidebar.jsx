
import { NavLink, useLocation } from "react-router-dom"; 
import { adminRoutes } from "../route/AdminRoutes";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 min-h-screen w-[300px] max-w-[300px]">
      <ul className="flex flex-col gap-2 mt-5 p-3">
        {adminRoutes.map((route) => (
          <li key={route.PATH}>
            <NavLink
              to={route.PATH}
              className={`flex items-center gap-2 p-2 rounded-md ${
                location.pathname === route.PATH
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span>{route.NAME}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
