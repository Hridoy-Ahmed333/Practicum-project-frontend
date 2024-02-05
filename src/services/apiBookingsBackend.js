import { getToday } from "../utils/helpers";

export async function getBooking(id) {
  try {
    const response = await fetch(`http://localhost:5050/bookings/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
}

export async function getBookingsAfterDate(date) {
  try {
    const response = await fetch("http://localhost:5050/bookings");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    // Filter the data according to your needs
    data = data.filter(
      (item) =>
        // new Date(item.created_at) >= new Date(date) &&
        // new Date(item.created_at) <= new Date(getToday({ end: true }))
        new Date(item.booking.startDate) >= new Date(date) &&
        new Date(item.booking.startDate) <= new Date(getToday({ end: true }))
    );

    // Select the required fields
    data = data.map((item) => ({
      //   created_at: item.created_at,
      //   totalPrice: item.totalPrice,
      //   extrasPrice: item.extrasPrice,
      created_at: item.booking.created_at,
      totalPrice: item.booking.totalPrice,
      extrasPrice: item.booking.extraPrice,
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function getStaysAfterDate(date) {
  try {
    const response = await fetch("http://localhost:5050/bookings");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filter the data according to your needs
    const filteredData = data.filter(
      (item) =>
        new Date(item.booking.startDate) >= new Date(date) &&
        new Date(item.booking.startDate) <= new Date(getToday())
    );
    console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function getStaysTodayActivity() {
  try {
    const response = await fetch("http://localhost:5050/bookings");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filter the data according to your needs
    const filteredData = data.filter(
      (item) =>
        (item.booking.status === "unconfirmed" &&
          item.startDate === getToday()) ||
        (item.booking.status === "checked-in" && item.endDate === getToday())
    );
    console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function updateBooking(id, obj) {
  try {
    const response = await fetch(`http://localhost:5050/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedData = await response.json();
    console.log(updatedData);
    return updatedData;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

export async function deleteBooking(id) {
  try {
    const response = await fetch(`http://localhost:5050/bookings/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
