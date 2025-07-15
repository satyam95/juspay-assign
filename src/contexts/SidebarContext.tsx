import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { SidebarContext } from "./SidebarContextUtils";

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (!isInitialized) {
        if (screenWidth < 1025) {
          setIsMainSidebarOpen(false);
          setIsNotificationSidebarOpen(false);
        }
        else if (screenWidth >= 1200) {
          setIsMainSidebarOpen(true);
        }
        setIsInitialized(true);
      } else {
        if (screenWidth >= 1200) {
          setIsMainSidebarOpen(true);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInitialized]);

  const toggleMainSidebar = () => {
    if (window.innerWidth < 1025) {
      setIsMainSidebarOpen((prev) => !prev);
    }
  };

  const toggleNotificationSidebar = () => {
    setIsNotificationSidebarOpen((prev) => !prev);
  };

  const closeMainSidebar = () => {
    setIsMainSidebarOpen(false);
  };

  const closeNotificationSidebar = () => {
    setIsNotificationSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMainSidebarOpen,
        isNotificationSidebarOpen,
        toggleMainSidebar,
        toggleNotificationSidebar,
        closeMainSidebar,
        closeNotificationSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
