import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import "./index.css";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Settings from "@/pages/Setting";

export default function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
