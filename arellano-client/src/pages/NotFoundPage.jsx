import { Link } from "react-router-dom";
import Button from "../components/Button";
import bgImg from "../assets/images/bug.jpg";

{/* Enhancement 3: Make a design for the NotFoundPage. */}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex items-center justify-center text-white text-center px-6">
  <div
    className="absolute inset-0 bg-cover bg-center blur-xs scale-100"
    style={{ backgroundImage: `url(${bgImg})` }}
  ></div>
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="relative z-10 bg-black/40 backdrop-blur-sm px-6 py-6 rounded-2xl">
    <h1 className="text-6xl font-bold">404</h1>

    <h2 className="mt-4 text-2xl font-semibold">
      Oops! You’ve wandered off the path 🌿
    </h2>
    <p className="mt-3 max-w-md text-sm text-white/80">
      The page you're looking for might have been moved or never existed.
      But don't worry—there are still magical places to explore.
    </p>
    <div className="mt-6">
      <Link to="/">
        <Button className="bg-white text-[#6B8754] hover:bg-zinc-200">
          Go Back Home
        </Button>
      </Link>
    </div>
  </div>

</div>
  );
}
export default NotFoundPage;