import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

export const isMobileDevice = (): boolean => {
  const userAgent = headers().get("user-agent") ?? "";
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  return isMobile;
};
