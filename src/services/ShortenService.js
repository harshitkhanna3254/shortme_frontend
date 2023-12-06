// src/service/shortenUrlService.js
const API_BASE_URL = process.env.REACT_APP_API_URL;

const shortenUrl = async (url, urlType) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // If there's a token, add it to the Authorization header
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/shorten`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  console.log("Shorten Response: ", data);

  if (!response.ok) {
    // Handle error response
    const error = new Error("Url Shorten Failed");
    error.details = data;
    throw error;
  }

  const { shortUrl } = data;

  return { shortUrl };
};

export default shortenUrl;
