const API_URL = "http://192.168.8.95:9000";

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users/all`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
