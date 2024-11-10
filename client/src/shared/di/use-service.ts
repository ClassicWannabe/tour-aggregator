import { Api } from "../api";
import { createService } from "./create-service";

const services = new Map();

export function useService<T>(adapter: new (api: Api) => T): T {
  if (!services.has(adapter)) {
    services.set(adapter, createService(adapter));
  }

  return services.get(adapter)();
}
