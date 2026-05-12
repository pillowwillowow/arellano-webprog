import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#6B8754] focus:bg-zinc-50 focus:shadow-[0_0_12px_rgba(107,135,84,0.35)]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Login API
      const { data } = await loginUser({ email, password });

      // Save user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      // Navigate to dashboard
      navigate("/dashboard", {
        state: {
          firstName: data.firstName,
          type: data.type,
        },
      });
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
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

      {/* Error Message */}
      {error && (
        <div className="mt-6 rounded-2xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-700 shadow-[0_0_10px_rgba(255,0,0,0.15)]">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-2 text-xs leading-5 text-zinc-700">
            Must contain at least 8 characters with letters, numbers, and
            symbols.
          </p>
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