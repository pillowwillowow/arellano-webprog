import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      return "All fields are required";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,

        // REQUIRED missing fields
        age: "18",
        gender: "other",
        contactNumber: "00000000000",
        address: "N/A",

        role: "viewer",
        userName: form.email.split("@")[0],
        isActive: true,
      });

      alert("Account created successfully!");
      navigate("/auth/signin");

    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Sign Up
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account and step into a world of enchantment.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={inputClasses}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-6 border-t border-pink-800 pt-6 text-sm text-zinc-800">
        Already have an account?{" "}
        <Link to="/auth/signin" className="font-semibold text-zinc-900">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;