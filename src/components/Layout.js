// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

export default function Layout() {
  return (
    <>
      <Menu />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
