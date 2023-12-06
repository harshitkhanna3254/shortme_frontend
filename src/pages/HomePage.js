import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import { QRCodeSVG } from "qrcode.react"; // Importing a named export

import shortenService from "../services/ShortenService";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [urlType, setUrlType] = useState("Automatic");

  const [qrCode, setQrCode] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState({});

  const { user } = useContext(AuthContext);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlTypeChange = (event) => {
    setUrlType(event.target.value);
  };

  function isValidURL(url) {
    // Define the regular expression pattern for URL validation
    const urlPattern =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    // Use the test method to check if the URL matches the pattern
    return urlPattern.test(url);
  }

  const handleError = (errorObject) => {
    setError(errorObject);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 4000); // Hide after 4 seconds
  };

  const handleShortenClick = async () => {
    try {
      if (!isValidURL(url)) {
        const error = {
          detailedMessage: "Please enter a valid URL",
          errorSummary: "Validation Error",
        };

        handleError(error);
        return;
      }

      if (urlType === "QR") {
        setQrCode(url);
        return;
      }
      setQrCode(null);
      console.log(url, urlType);
      const result = await shortenService(url, urlType);
      setShortenedUrl(result.shortUrl); // Assuming the API returns an object with the shortened URL
    } catch (error) {
      setShortenedUrl("");
      handleError(error.details);
    }
  };

  const hasNoSubscription = user && !user.subscriptionPlan;

  return (
    <>
      {showSnackbar && (
        <Snackbar error={error} onClose={() => setShowSnackbar(false)} />
      )}
      <div
        className="min-h-screen py-900 pt-20"
        style={{ backgroundImage: "linear-gradient(115deg, #1A237E, #78909C)" }}
      >
        <div
          className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md"
          style={{ height: "70vh" }}
        >
          {/* URL Shortener Section */}
          <div className="mx-auto p-4" style={{ width: "100vh" }}>
            <h1 className="text-2xl font-bold text-center mb-4">
              Free URL Shortener
            </h1>
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="Enter link here"
                value={url}
                onChange={handleUrlChange}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="relative w-full mb-4">
                <select
                  value={urlType}
                  onChange={handleUrlTypeChange}
                  className="w-full p-2 border rounded appearance-none"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="QR">QR Code</option>
                  <option value="Emoji">Emoji</option>
                  <option value="Magic">Magic</option>
                  <option value="Alias">Alias</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7a1 1 0 011-1h7a1 1 0 011 1v1h-9V7z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleShortenClick}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Shorten URL
              </button>

              {qrCode && (
                <div className="mt-4 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center justify-center">
                  <QRCodeSVG value={qrCode} size={128} />
                </div>
              )}

              <div className="mt-4 p-2 w-full text-center rounded">
                <input
                  type="text"
                  placeholder="The Generated URL will show here"
                  value={shortenedUrl}
                  className="w-full p-2 mb-4 border rounded"
                  readOnly
                />
              </div>

              <div className="mt-2 p-1 bg-green-200 text-green-800 w-full text-center rounded">
                <button className="ml-4">Copy</button>
              </div>
            </div>
          </div>

          {/* Subscription Details Section */}
          <div className="mx-auto p-4" style={{ width: "100vh" }}>
            <div className="border-t pt-8">
              {hasNoSubscription ? (
                <div>
                  <p className="text-gray-700 mb-4">
                    You currently do not have a subscription plan. Check out our
                    plans to unlock more features!
                  </p>
                  <Link
                    to="/subscriptions"
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    View Subscription Plans
                  </Link>
                </div>
              ) : user ? (
                // Display subscription details if available
                <div>
                  <p>Your subscription plan: {user.subscriptionPlan}</p>
                  {/* Other subscription details */}
                </div>
              ) : (
                // Display a message for non-logged-in users or provide a link to log in/register
                <div>
                  <p className="text-gray-700 mb-4">
                    You currently do not have a subscription plan. Check out our
                    plans to unlock more features!
                  </p>
                  <Link
                    to="/subscriptions"
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    View Subscription Plans
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
