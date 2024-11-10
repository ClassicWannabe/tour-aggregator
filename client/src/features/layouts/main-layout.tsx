// import { isMobileDevice } from "@/shared/utils/device";
// import { DesktopHeader } from "@/features/header/desktop-header";
import { ReactNode } from "react";
import { MobileHeader } from "../header/mobile-header";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  // const isMobile = isMobileDevice();
  return (
    <main>
      <MobileHeader />
      {children}
    </main>
  );
};
