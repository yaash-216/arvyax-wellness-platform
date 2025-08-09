import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "lucide-react";
import { Outlet } from "react-router";
import type { LinkInterface } from "../types";
import { useContext } from "react";

const Logic = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const links: LinkInterface[] = [{ to: "/", label: "Explore" }];
  const istokenlink: LinkInterface[] = [
    { to: "/my-sessions", label: "My Sessions" },
    { to: "/editor/", label: "New Session" },
  ];
  const isnottokenlink: LinkInterface[] = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="hover:underline text-sm font-bold underline-offset-4 decoration-red-500"
          >
            {link.label}
          </Link>
        </li>
      ))}
      {token ? (
        <>
          {istokenlink.map((link) => (
            <li key={link.to}>
              <Link
                className="hover:underline  text-sm font-bold underline-offset-4 decoration-red-500"
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="btn btn-sm btn-error" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          {isnottokenlink.map((link) => (
            <li key={link.to}>
              <Link
                className="hover:underline  text-sm font-bold underline-offset-4 decoration-red-500"
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </>
      )}
    </>
  );
};

const Layout = () => {
  return (
    <div>
      <div className="navbar bg-base-300 px-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Arvyax Wellness
          </Link>
        </div>
        <ul className="hidden md:flex gap-3 items-center">
          <Logic />
        </ul>
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-primary btn-circle">
            <Menu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
          >
            <Logic />
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
