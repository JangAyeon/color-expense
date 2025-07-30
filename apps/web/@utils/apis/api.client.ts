import { ApiMethod } from "@constant/api.route";

type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = "/api") {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  }

  get<T>(endpoint: string, params?: Record<string, any>) {
    const searchParams = params ? `?${new URLSearchParams(params)}` : "";
    return this.request<T>(`${endpoint}${searchParams}`, {
      method: ApiMethod.get,
    });
  }

  post<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: ApiMethod.post,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: ApiMethod.patch,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: ApiMethod.delete });
  }
}

export const apiClient = new ApiClient();
