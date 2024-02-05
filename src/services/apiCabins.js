// Function to fetch all cabins
export async function getCabins() {
  const response = await fetch("http://localhost:5050/cabins");
  const data = await response.json();
  return data;
}

// Function to fetch a specific cabin by ID
export async function getCabinById(id) {
  const response = await fetch(`http://localhost:5050/cabins/${id}`);
  const data = await response.json();
  return data;
}
