import MenuOutlined from "@/shared/icons/menu-outlined.svg";
import LogoMain from "@/shared/icons/logo-main.svg";
import UserOutlined from "@/shared/icons/user-outlined.svg";
import { Button } from "antd";

export function MobileHeader() {
  return (
    <header className="px-4 py-2 flex items-center justify-between sticky top-0 bg-back-base">
      <Button type="text" icon={<MenuOutlined />} />
      <LogoMain />
      <Button type="text" icon={<UserOutlined />} />
    </header>
  );
}
