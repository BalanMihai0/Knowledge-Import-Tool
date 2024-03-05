import { useEffect, useState } from "react";
import loginUser from "../services/login";
import { useNavigate } from "react-router-dom";
import "./custom.css";
import Logo from "../assets/iqadot_logo_small_transparent.png";
import isAuthorized from "../token/isAuthorized";
import Background from "../assets/BackgroundWebsite.jpg";
import axios from "axios";
import config from "../../config.json";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
    isAuthorized(navigate, false);
  });

  // Define state to capture the input values
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Update the state when input values change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  async function HandleFormSubmit(e: any) {
    e.preventDefault();

    // Create an instance of loginDTO with the captured values
    const loginDetails = {
      email: formData.email,
      password: formData.password,
    };

    // Send the DTO to the loginUser function
    if (await loginUser(loginDetails)) {
      navigate("/home");
    }
  }

  return (
    <div 
      className="flex flex-col justify-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
    <div className="h-full flex">

      <a href="https://iqadot.com">
        <img className="fixed top-0 right-0 w-52 " src={Logo} />
      </a>
      <div className="m-auto text-center">
        <h1 className="text-5xl font-semibold mb-3">Login</h1>
        <form
          className="bg-transparent border-none text-black"
          onSubmit={HandleFormSubmit}
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="form-input bg-blue-200 w-full mt-2 rounded-lg"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="form-input bg-blue-200 w-full mt-2 rounded-lg"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-full text-white font-semibold bg-primary mt-3 w-full h-10"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
