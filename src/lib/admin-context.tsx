"use client";

import { createContext, useContext, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: true });

export function AdminProvider({ children }: { children: ReactNode }) {
  // For now, we'll consider everyone as admin
  const value = { isAdmin: true };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}