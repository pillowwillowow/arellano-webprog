import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6B8754] focus:bg-zinc-50 focus:shadow-[0_0_12px_rgba(107,135,84,0.35)]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        setError("");

        // Call login API
        const { data } = await loginUser({
          email,
          password,
        });

        console.log("Login successful:", data);

        // BLOCK VIEWERS
        if (user.role === "viewer") {
          setError("Viewers are not allowed to log in.");
          return;
        }

        // Save logged in user
        const loggedInUser = {
          token: data.token,
          firstName: data.firstName,
          role: data.role,
          email: data.email,
        };

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

        localStorage.setItem("token", data.token);

        // Navigate to dashboard
        navigate("/dashboard");

      } catch (err) {
        console.error(
          "Login failed:",
          err.response?.data?.message || err.message
        );

        setError(
          err.response?.data?.message ||
          "Login failed. Please try again."
        );
      }
    };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Log In
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-800">
        Dive back into your enchanted fairy garden and continue your magical
        journey through nature, stories, and glowing adventures.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium" htmlFor='email'>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@email.com"
            className={inputClasses}
          />
          {error && (
        <div className="mt-6 rounded-2xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-700 shadow-[0_0_10px_rgba(255,0,0,0.15)]">
          {error}
        </div>
      )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor='password'>
            Password
          </label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className={`${inputClasses} pr-12`} 
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center"
            >
              <span className="flex items-center justify-center w-full h-full leading-none">
                {showPassword ? (
                  <Visibility
                    className="block"
                    style={{ transform: 'translateY(2.5px)' }}
                  />
                ) : (
                  <VisibilityOff
                    className="block"
                    style={{ transform: 'translateY(2.5px)' }}
                  />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-[#6B8754]"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="font-medium text-zinc-700 transition hover:text-[#6B8754]"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} hover:shadow-[0_0_20px_rgba(107,135,84,0.6)]`}
        >
          Log In
        </Button>

        {/* Social Login */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Google
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Apple
          </Button>
        </div>
      </form>

      {/* Sign Up */}
      <div className="mt-8 border-t border-zinc-300 pt-6 text-sm text-zinc-700">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#13220d]"
        >
          Create one here
        </Link>
      </div>
    </>
  );
}

export default SignInPage;