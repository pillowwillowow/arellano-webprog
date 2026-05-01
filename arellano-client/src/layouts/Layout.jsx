import { Outlet, Link, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import logoImg from "../assets/images/logo.png";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      document.title = "cy.dev";
    } else if (pathname.includes("about")) {
      document.title = "About | cy.dev";
    } else if (pathname.includes("articles")) {
      document.title = "Articles | cy.dev";
    } else if (pathname.includes("signin")) {
      document.title = "Sign In | cy.dev";
    } else if (pathname.includes("signup")) {
      document.title = "Sign Up | cy.dev";
    } else {
      document.title = "cy.dev";
    }
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-[#bac193] text-zinc-900">
      
      <NavBar />
      <main className="flex-1 pt-20 pb-16">
        <Outlet />
      </main>

      {/* Enhancement 1: Create and make a design for the Footer. */}
      <footer className="bg-[#4A5D23] text-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Fairy Diary Logo"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-heading">Fairy Diary</span>
              <span className="text-xs text-white/80 font-body">
                magical plants & whimsical stories
              </span>
            </div>
          </div>

          <div className="flex items-center font-bold gap-6 text-sm font-body">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="text-white/50">•</span>
            <Link to="/about" className="hover:underline">About</Link>
            <span className="text-white/50">•</span>
            <Link to="/articles" className="hover:underline">Articles</Link>
          </div>

        </div>

        <hr className="border-white/30 w-full my-4" />

        <div className="text-xs text-white/70 text-center">
          <p>© 2026 All Rights Reserved</p>
          <p>Made with 🌱 & a little magic</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;