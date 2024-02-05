export async function getSettings() {
  const url = "http://localhost:5050/settings";

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
}

export async function updateSetting(newSetting) {
  const url = "http://localhost:5050/settings/65bf52aa32ff4768237f9d2b"; // Assuming the settings with id=1 is being updated
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(newSetting),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
}
