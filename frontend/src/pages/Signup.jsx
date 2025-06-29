import { Heading } from "../component/Heading";
import { Button } from "../component/Button";
import { InputBox } from "../component/Inputbox";
import { BottomWarning } from "../component/Bottomwarning";
import { SubHeading } from "../component/Subheading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-300 p-8">
        <div className="text-center mb-6">
          <Heading label="Create Account" className="text-blue-700" />
          <SubHeading
            label="Enter your details to get started"
            className="text-red-600"
          />
        </div>

        <div className="space-y-4">
          <InputBox
            onChange={(e) => setfirstname(e.target.value)}
            label="First Name"
            placeholder="John"
            className="text-gray-800"
          />
          <InputBox
            onChange={(e) => setlastname(e.target.value)}
            label="Last Name"
            placeholder="David"
            className="text-gray-800"
          />
          <InputBox
            onChange={(e) => setusername(e.target.value)}
            label="Email"
            placeholder="john@gmail.com"
            className="text-gray-800"
          />
          <InputBox
            onChange={(e) => setpassword(e.target.value)}
            label="Password"
            placeholder="********"
            type="password"
            className="text-gray-800"
          />
        </div>

        <div className="mt-6">
          <Button
            label="Sign Up"
            onClick={async () => {
              const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/signup`,
                {
                  firstname,
                  lastname,
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/Transactions");
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
          />
        </div>

        <div className="mt-4 text-sm text-center text-gray-700">
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign In"
            to="/signin"
            className="text-blue-700 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};
