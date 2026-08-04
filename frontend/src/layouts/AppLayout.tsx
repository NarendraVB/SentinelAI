import { Outlet } from "react-router-dom";

import Header from "@/components/header/Header";
import Sidebar from "@/components/navigation/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto bg-zinc-950 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}