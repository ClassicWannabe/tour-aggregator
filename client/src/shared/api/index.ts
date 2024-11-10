import configs from "@/shared/configs";
// import { getLocale } from "next-intl/server";

const API_URL = configs.API_BASE;

export class Api {
  static #instance: Api;

  private async request<T>(module: string, init?: RequestInit): Promise<T> {
    // const locale = await getLocale();
    const headers = new Headers(init?.headers);
    if (!headers.has("Accept-Language")) {
      headers.set("Accept-Language", configs.DEFAULT_LANGUAGE);
    }

    try {
      const response = await fetch(API_URL + module, { ...init, headers });

      if (!response.ok) {
        const responseError: ApiResponse<null> = await response.json();
        throw new Error(
          responseError.error[
            configs.DEFAULT_LANGUAGE as keyof typeof responseError.error
          ] || responseError.error.ru
        );
      }

      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      if (isJson) {
        const jsonResponse: ApiResponse<T> = await response.json();
        if (!jsonResponse.success) {
          console.error("Response success: ", jsonResponse.success);

          throw new Error(
            jsonResponse.error[
              configs.DEFAULT_LANGUAGE as keyof typeof jsonResponse.error
            ] || jsonResponse.error.ru
          );
        }

        return jsonResponse.data;
      } else {
        // TODO: Other cases?
        throw new Error("Invalid JSON response");
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error();
    }
  }

  private attachQueryParams(
    url: string,
    query?: Record<string, string>
  ): string {
    if (!query || Object.keys(query).length === 0) {
      return url; // Return the URL unchanged if no query parameters are provided.
    }

    const queryString = new URLSearchParams(query).toString();
    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}${queryString}`;
  }

  public static get instance(): Api {
    if (!Api.#instance) {
      Api.#instance = new Api();
    }

    return Api.#instance;
  }

  get<T>(
    module: string,
    options?: Omit<RequestInit, "method"> & { query?: Record<string, string> }
  ) {
    return this.request<T>(
      this.attachQueryParams(module, options?.query),
      options
    );
  }

  // TODO: Implement
  post() {}

  // TODO: Implement
  put() {}

  // TODO: Implement
  patch() {}
}

export interface ApiResponse<T> {
  data: T;
  error: {
    en: string;
    ru: string;
    kz: string;
  };
  success: boolean;
}
