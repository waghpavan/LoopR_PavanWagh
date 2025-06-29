import { useState } from "react";
import { BottomWarning } from "../component/Bottomwarning";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { InputBox } from "../component/Inputbox";
import { SubHeading } from "../component/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/signin`,
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        navigate("/Transactions");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("User not found or incorrect credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-300 p-8">
        <div className="text-center mb-6">
          <Heading label="Welcome Back" className="text-blue-700" />
          <SubHeading label="Sign in to your Finalyze dashboard" className="text-red-600" />
        </div>

        <div className="space-y-4">
          <InputBox
            label="Username"
            placeholder="e.g. john.doe"
            onChange={(e) => setusername(e.target.value)}
            className="text-gray-800"
          />
          <InputBox
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setpassword(e.target.value)}
            className="text-gray-800"
          />
        </div>

        <div className="mt-6">
          <Button
            label="Sign In"
            onClick={handleSignin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
          />
        </div>

        <div className="mt-4 text-sm text-center text-gray-700">
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign Up"
            to="/signup"
            className="text-blue-700 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};
