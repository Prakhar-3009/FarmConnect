"use client"

// API service for connecting to Flask backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function for API requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // You can add auth token from Clerk here if needed for your Flask backend
  // const { getToken } = useAuth();
  // const token = await getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred while connecting to the server",
    }))
    throw new Error(error.message || "An error occurred")
  }

  return response.json()
}

// Farmers API
export const farmersApi = {
  getAll: () => fetchWithAuth(`${API_BASE_URL}/farmers`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/farmers/${id}`),
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/farmers`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/farmers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`${API_BASE_URL}/farmers/${id}`, {
      method: "DELETE",
    }),
}

// Products API
export const productsApi = {
  getAll: () => fetchWithAuth(`${API_BASE_URL}/products`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/products/${id}`),
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    }),
}

// Farming Types API
export const farmingTypesApi = {
  getAll: () => fetchWithAuth(`${API_BASE_URL}/farming-types`),
  getById: (id: string) => fetchWithAuth(`${API_BASE_URL}/farming-types/${id}`),
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/farming-types`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/farming-types/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`${API_BASE_URL}/farming-types/${id}`, {
      method: "DELETE",
    }),
}

// Records API
export const recordsApi = {
  getAll: () => fetchWithAuth(`${API_BASE_URL}/records`),
}
