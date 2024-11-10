import { Api } from "../api";

export function createService<T>(adapter: new (api: Api) => T) {
  let service: T | null = null;

  return () => {
    if (!service) {
      service = new adapter(Api.instance);
    }

    return service;
  };
}
