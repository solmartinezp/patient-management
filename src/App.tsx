import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PatientsPage } from "./pages/PatientsPage";
import "./App.css";
import "./i18n";
import { Header } from "./components/Header";
import "./constants/variables.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <Header />
        <PatientsPage />
      </div>
    </QueryClientProvider>
  );
}
