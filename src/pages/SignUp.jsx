import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/auth/authActions";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/ui/Button";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (signupSuccess && !loading && !error) {
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    }

    if (error) {
      setFormError(error);
    }
  }, [signupSuccess, loading, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setFormError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(signUp({ name, email, password })).unwrap();
      setEmail("");
      setPassword("");
      setName("");
      setSignupSuccess(true);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 dark:bg-zinc-900 transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-3xl mb-6 text-gray-800 dark:text-white">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="py-2 px-4 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-4 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}

          <Button type="submit" className="mt-2">
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 dark:text-green-400 underline"
            >
              Login
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
