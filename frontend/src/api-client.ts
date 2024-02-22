import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
// const API_BASE_URL = "";

export const register = async (formData: RegisterFormData) => {
  const request = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await request.json();

  if (data.status === "failure") {
    throw new Error(data.message);
  }
};

export const login = async (formData: SignInFormData) => {
  const request = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await request.json();

  if (data.status === "failure") {
    throw new Error(data.message);
  }
};

export const validateToken = async () => {
  const request = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!request.ok) {
    throw new Error("Token invalid");
  }

  return await request.json();
};

export const logout = async () => {
  const request = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!request.ok) {
    throw new Error("Error during logout");
  }
};

export const addMyHotel = async (hotelForm: FormData) => {
  const request = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelForm,
  });

  if (!request.ok) {
    throw new Error("Failed to add hotel");
  }

  return await request.json();
};
