import { createContext, useContext } from "react";

export interface SidebarContextType {
  isMainSidebarOpen: boolean;
  isNotificationSidebarOpen: boolean;
  toggleMainSidebar: () => void;
  toggleNotificationSidebar: () => void;
  closeMainSidebar: () => void;
  closeNotificationSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}; 