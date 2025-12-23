const BASE_URL = "http://127.0.0.1:8000";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
