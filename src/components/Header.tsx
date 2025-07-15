import { useTheme } from "../contexts/ThemeContext";
import { useSidebar } from "../contexts/SidebarContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleMainSidebar, toggleNotificationSidebar } = useSidebar();
  return (
    <div className="h-17">
      <div className="h-full border-b border-[rgba(28,28,28,0.1)] dark:border-[rgba(255,255,255,0.1)] transition-colors duration-200">
        <div className="px-7 flex flex-row items-center justify-between py-5">
          <div className="flex flex-row gap-2">
            <button
              onClick={toggleMainSidebar}
              className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer"
            >
              {theme === "light" ? (
                <img
                  src="/menu.png"
                  alt="hamburger icon for main sidebar"
                  className="min-w-5 h-5"
                />
              ) : (
                <img
                  src="/menu-dark.png"
                  alt="hamburger icon for main sidebar"
                  className="min-w-5 h-5"
                />
              )}
            </button>
            <div
              className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer"
            >
              {theme === "light" ? (
                <img
                  src="/star.png"
                  alt="star icon"
                  className="min-w-5 h-5"
                />
              ) : (
                <img
                  src="/star-dark.png"
                  alt="star icon"
                  className="min-w-5 h-5"
                />
              )}
            </div>
            <div className="hidden lg:block">
              <div className="flex flex-row items-center gap-2">
                <div className="text-sm text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] leading-5 font-normal px-2 py-1 transition-colors duration-200">
                  Dashboards
                </div>
                <div className="text-sm text-[rgba(28,28,28,0.2)] dark:text-[rgba(255,255,255,0.2)] leading-5 font-normal transition-colors duration-200">
                  /
                </div>
                <div className="text-sm leading-5 font-normal px-2 py-1 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                  Default
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-40 h-7 bg-[rgba(28,28,28,0.05)] dark:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors duration-200">
              <div className="w-full flex flex-row items-center justify-between px-2 py-1">
                {theme === "light" ? (
                  <img
                    src="/search.png"
                    alt="search icon"
                    className="min-w-4 h-4"
                  />
                ) : (
                  <img
                    src="/search-dark.png"
                    alt="search icon"
                    className="min-w-4 h-4"
                  />
                )}
                <input
                  placeholder="Search"
                  className="flex-1 w-full h-full placeholder:text-sm ml-1 placeholder:text-[rgba(28,28,28,0.2)] dark:placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none text-[rgba(28,28,28,0.2)] dark:text-[rgba(255,255,255,0.2)] bg-transparent transition-colors duration-200"
                />
                {theme === "light" ? (
                  <img
                    src="/ctrl.png"
                    alt="ctrl icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <div className="text-[rgba(255,255,255,0.2)] text-sm leading-5 font-normal">
                    ⌘/
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                onClick={toggleTheme}
                className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer"
              >
                {theme === "light" ? (
                  <img
                    src="/sun.png"
                    alt="light mode icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/moon.png"
                    alt="light mode icon"
                    className="min-w-5 h-5"
                  />
                )}
              </button>
              <div className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer">
                {theme === "light" ? (
                  <img
                    src="/clock.png"
                    alt="sidebar hamburger icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/clock-dark.png"
                    alt="sidebar hamburger icon"
                    className="min-w-5 h-5"
                  />
                )}
              </div>
              <div className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer">
                {theme === "light" ? (
                  <img
                    src="/bell.png"
                    alt="sidebar hamburger icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/bell-dark.png"
                    alt="sidebar hamburger icon"
                    className="min-w-5 h-5"
                  />
                )}
              </div>
              <button
                onClick={toggleNotificationSidebar}
                className="min-w-7 h-7 flex justify-center items-center hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer"
              >
                {theme === "light" ? (
                  <img
                    src="/menu.png"
                    alt="hamburger icon for notification sidebar"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/menu-dark.png"
                    alt="hamburger icon for notification sidebar"
                    className="min-w-5 h-5"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
