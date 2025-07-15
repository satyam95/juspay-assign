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

  // Handle responsive behavior for both sidebars
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Only set initial state, don't override user interactions
      if (!isInitialized) {
        // On mobile screens below 500px, close both sidebars by default
        if (screenWidth < 1025) {
          setIsMainSidebarOpen(false);
          setIsNotificationSidebarOpen(false);
        }
        // On desktop (lg and above), main sidebar should always be visible
        else if (screenWidth >= 1200) {
          setIsMainSidebarOpen(true);
        }
        setIsInitialized(true);
      } else {
        // After initialization, only handle desktop behavior for main sidebar
        if (screenWidth >= 1200) {
          setIsMainSidebarOpen(true);
        }
      }
    };

    // Set initial state based on screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInitialized]);

  const toggleMainSidebar = () => {
    // Only allow toggle on mobile screens (below 1025px breakpoint)
    if (window.innerWidth < 1025) {
      setIsMainSidebarOpen((prev) => !prev);
    }
  };

  const toggleNotificationSidebar = () => {
    // Allow toggle on all screen sizes
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
