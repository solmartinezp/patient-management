import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PatientsPage } from "./pages/PatientsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 p-4 font-sans">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Patient Management
        </h1>
        <PatientsPage />
      </div>
    </QueryClientProvider>
  );
}
