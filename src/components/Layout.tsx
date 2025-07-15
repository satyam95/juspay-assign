import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import MainSidebar from "./MainSidebar";
import NotificationSidebar from "./NotificationSidebar";
import { useSidebar } from "../contexts/SidebarContext";

const Layout: React.FC = () => {
  const { isMainSidebarOpen, isNotificationSidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[rgba(28,28,28,1)] transition-colors duration-200">
      <div className="flex flex-row justify-between w-full min-h-screen">
        <div
          className={`${
            isMainSidebarOpen ? "w-53" : "xl:w-53 w-0"
          } min-h-screen transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div
            className={`${
              isMainSidebarOpen ? "opacity-100" : "xl:opacity-100 opacity-0"
            } w-full h-screen border-r border-[rgba(28,28,28,0.1)] dark:border-[rgba(255,255,255,0.1)] px-4 py-5 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out`}
          >
            <MainSidebar />
          </div>
        </div>
        <div
          className={`${
            isMainSidebarOpen
              ? isNotificationSidebarOpen
                ? "w-[calc(100%-30.75rem)]"
                : "w-[calc(100%-13.25rem)]"
              : isNotificationSidebarOpen
              ? "w-[calc(100%-17.5rem)]"
              : "w-full"
          } min-h-screen transition-all duration-300 ease-in-out`}
        >
          <Header />
          <div className="h-[calc(100vh-4.25rem)] w-full overflow-y-auto no-scrollbar">
            <Outlet />
          </div>
        </div>
        <div
          className={`${
            isNotificationSidebarOpen ? "w-70" : "w-0"
          } min-h-screen transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div
            className={`${
              isNotificationSidebarOpen ? "opacity-100" : "opacity-0"
            } w-full h-screen border-l border-[rgba(28,28,28,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out`}
          >
            <NotificationSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
