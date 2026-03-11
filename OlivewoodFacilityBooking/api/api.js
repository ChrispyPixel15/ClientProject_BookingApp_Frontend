import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.8.101:9000";

async function loginUser(number, pin) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, pin }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(err.error || "Login failed.");
    }    
    
    return data;
  } catch (error) {
    console.error("Error logging user in:", error);
    throw error;
  }
}

async function registerUser(name, number, unit, pin) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number, unit, pin }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Register failed.");
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

async function logoutUser() {
  await fetch(`${API_URL}/users/logout`, {
    method: "POST",
  });
}

async function getAllFacilities() {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found.")
  }

  const response = await fetch(`${API_URL}/facilities/all`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data;
}

async function createFacility(name) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/facilities/create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data;
}

async function test() {
  const response = await fetch(`${API_URL}/users/all`);
  const data = await response.json();   // wait for JSON to resolve
  console.log(data);
}

export { loginUser, registerUser, test, logoutUser, getAllFacilities, createFacility }
