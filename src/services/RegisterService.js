const registerService = async (username, password, firstName, lastName) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, firstName, lastName }),
  });

  const data = await response.json();

  console.log("Registration Data", data);

  if (!response.ok) {
    // Handle error response
    const error = new Error("Registration failed");
    error.details = data;
    throw error;
  }

  // Handle success response
  const {
    token,
    username: loggedInUsername,
    firstName: loggedInFirstName,
    lastName: loggedInLastName,
    subscriptionPlan,
    subscriptionStartDate,
    subscriptionEndDate,
  } = data;

  // You can return the necessary data or perform other actions like setting the token in localStorage
  return {
    token,
    loggedInUsername,
    loggedInFirstName,
    loggedInLastName,
    subscriptionPlan,
    subscriptionStartDate,
    subscriptionEndDate,
  };
};

export default registerService;
