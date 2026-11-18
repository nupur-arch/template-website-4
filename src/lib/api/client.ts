export interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" ||
  process.env.NODE_ENV !== "production" ||
  !process.env.NEXT_PUBLIC_API_BASE_URL;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.saffronpress.daily/v1";

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { params, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = {
    "Content-Type": "application/json",
    ...customConfig.headers,
  };

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Request Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // In fallback mode or if network fails, we fall back to mock handlers
    throw error;
  }
}

export function isMockEnabled(): boolean {
  return USE_MOCK;
}
