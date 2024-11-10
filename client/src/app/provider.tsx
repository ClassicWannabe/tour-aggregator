"use client";

import { ReactNode } from "react";
import { ConfigProvider } from "antd";

type Props = {
  children: ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00BE8B",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
