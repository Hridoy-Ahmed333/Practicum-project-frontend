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

export async function deleteCabin(id) {
  const res = await fetch(`http://localhost:5050/cabins/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Cabin could not be deleted:`);
  }
  const data = await res.json();
  console.log(data);
  return data;
}

export async function addCabins(newCabin) {
  try {
    const response = await fetch("http://localhost:5050/cabins", {
      method: "POST",
      body: newCabin, // Send FormData directly
    });

    if (!response.ok) {
      throw new Error(`Cabin could not be created: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// export async function addCabin(newCabin) {
//   try {
//     const response = await fetch("http://localhost:5050/cabins", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Make sure to set the content type
//       },
//       body: JSON.stringify(newCabin), // Stringify your object to send as JSON
//     });

//     if (!response.ok) {
//       throw new Error(`Cabin could not be created: ${response.statusText}`);
//     }

//     const data = await response.json();
//     //console.log(data);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function addCabin(formData) {
  try {
    const response = await fetch("http://localhost:5050/cabins", {
      method: "POST",
      body: formData, // Send FormData directly
    });

    if (!response.ok) {
      throw new Error(`Cabin could not be created: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
