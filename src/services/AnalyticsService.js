const analyticsService = async (username, password, firstName, lastName) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // If there's a token, add it to the Authorization header
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/retrieveData`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle error response
    const error = new Error("Analytics API failed");
    error.details = data;
    throw error;
  }

  return data;
};

export default analyticsService;
