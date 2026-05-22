import { NavLink } from "react-router-dom";
import logo from "../assets/images/glow.png";

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300",
    isActive
      ? "border-yellow-500 bg-gray-300 text-black shadow-[0_0_10px_rgba(253,224,71,0.7)]"
      : "border-transparent bg-yellow-200 text-black hover:bg-gray-300",
  ].join(" ");

const NavBar = () => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-30 border-b-2 border-zinc-900"
      style={{
      background: "linear-gradient(135deg, #6B8754, #A3B18A)",
    }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">

          {/* Main Links */}
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          <span className="text-white/100">✦</span>

          {/*Enhancement 3: Add access point (button or link) on the NavBar. | DONE*/}
          <NavLink
            to="/auth/signin"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white hover:text-[#6B8754] transition"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/auth/signup"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white hover:text-[#6B8754] transition"
          >
            Sign Up
          </NavLink>

        </nav>

      </div>
    </header>
  );
};

export default NavBar;