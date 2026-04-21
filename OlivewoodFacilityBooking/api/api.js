import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://api.134.209.196.98.sslip.io";

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

async function getUser() {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("User not Found");
  }

  return data;
}

async function editUser(id, edited) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}/users/update/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify(edited)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("User not Found");
  }

  return data;
}

async function acceptRequest(name, number, unit) {
   const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}/users/requestaccept`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({
      name: name,
      number: number,
      unit: unit,
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("User not Found");
  }

  return data;
}

async function getUserRole() {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const decoded = jwtDecode(token);
  
  return decoded.role;
}

async function getUserID() {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const decoded = jwtDecode(token);
  console.log(decoded);
  
  return decoded.userId;
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

async function deleteFacility(id) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/facilities/deletefacility/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete data");
  }

  return data;
}

async function editFacility(id, newName) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/facilities/updatefacility/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ name: newName })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update facility");
  }

  return data;
}

async function openFacility(id) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/facilities/facilityview/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Facility not Found");
  }

  return data;
}

async function facilityBookings(id) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/bookings/facilitybookings/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Facility not Found");
  }

  return data;
}

async function newBooking(userID, facID, date, time) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/bookings/create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ 
      userid: userID,
      facilityid: facID,
      date: date,
      time: time
     }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data;
}

async function updateBooking(id, date, time) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/bookings/update/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ 
      date: date,
      time: time
     })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update facility");
  }

  return data;
}

async function deleteBooking(id) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch(`${API_URL}/bookings/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",      
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete data");
  }

  return data;
}

async function getAllUsers() {
  const response = await fetch(`${API_URL}/users/all`);
  const data = await response.json();   // wait for JSON to resolve
  return data;
}

async function updateUserPin(name, newPin, number) {
  const response = await fetch(`${API_URL}/users/updatepin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ 
      name: name,
      pin: newPin,
      number: number
     })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update facility");
  }

  return data;
}

export { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getAllFacilities, 
  createFacility, 
  deleteFacility, 
  getUserRole, 
  editFacility,
  getUser,
  editUser,
  acceptRequest,
  openFacility,
  facilityBookings,
  getUserID,
  newBooking,
  getAllUsers,
  updateBooking,
  deleteBooking,
  updateUserPin
}
