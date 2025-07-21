import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authActions";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("i@g.com");
  const [password, setPassword] = useState("12345678");

  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (error) {
      setFormError(error);
    }
  }, [user, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setFormError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="mt-2 bg-purple-200 h-132 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-center font-semibold text-4xl ">Login User</h1>
        <form
          className="flex flex-col items-center mt-8"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4 mb-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            disabled={loading}
          />
          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}

          <Button
            type="submit"
            className="mt-4"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
