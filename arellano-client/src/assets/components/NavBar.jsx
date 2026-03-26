import { NavLink } from "react-router-dom";
import bgImage from "../images/whip.jpg";
import logo from "../images/glow.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

  {/* Navigation bar design | Enhancement 1:DONE ꩜ */}
  const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300",
    isActive
      ? "border-yellow-500 bg-gray-300 text-black shadow-[0_0_10px_rgba(253,224,71,0.7)] hover:shadow-[0_0_20px_rgba(253,224,71,0.9)]"
      : "border-transparent bg-yellow-200 text-black hover:bg-gray-300 hover:border-gray-200 hover:shadow-[0_0_10px_rgba(253,224,71,0.7)] hover:shadow-[0_0_20px_rgba(253,224,71,0.9)]",
  ].join(" ");

const NavBar = () => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-30 border-b-2 border-zinc-900"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Create own logo | Enhancement 3:DONE ꩜ */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="space-y-0.5">
            <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;