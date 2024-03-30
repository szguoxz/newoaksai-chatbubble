import React from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#7c3aed" } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
