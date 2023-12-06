import React, { useContext, useState } from "react";

import RegisterBackground from "../assets/RegisterBackground.png";
import { Link, useNavigate } from "react-router-dom";
import registerService from "../services/RegisterService";
import Snackbar from "../components/Snackbar";
import { AuthContext } from "../context/AuthContext";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState({});

  const { contextLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleError = (errorObject) => {
    setError(errorObject);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 4000); // Hide after 4 seconds
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Register called");
    console.log("Username: ", username);
    console.log("Password: ", password);
    console.log("FirstName: ", firstName);
    console.log("LastName: ", lastName);

    try {
      const userData = await registerService(
        username,
        password,
        firstName,
        lastName
      );
      console.log("Register successful", userData);
      contextLogin(userData, userData.token);
      navigate("/");
    } catch (error) {
      console.log(error.details);

      handleError(error.details);
    }
  };

  return (
    <>
      {showSnackbar && (
        <Snackbar error={error} onClose={() => setShowSnackbar(false)} />
      )}

      <div
        className="min-h-screen py-40"
        style={{ backgroundImage: "linear-gradient(115deg, #1A237E, #78909C)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${RegisterBackground})` }}
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  This is ShortMe. Enjoy our best in class and easy to use
                  services. If you already have an account, please &nbsp;
                  <Link to="/login" className="text-purple-500 font-semibold">
                    LogIn &nbsp;
                  </Link>
                  here.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only takes a minute.
              </p>
              <form onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-400 py-1 px-2 rounded"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="border border-gray-400 py-1 px-2 rounded"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Username"
                    className="border border-gray-400 py-1 px-2 w-full rounded"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full rounded"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-purple-500 py-3 text-center text-white"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
