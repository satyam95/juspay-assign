import { useTheme } from "../contexts/ThemeContextUtils";

const Pagination = () => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <div className="p-1">
        {theme === "light" ? (
          <img src="/prev.png" alt="prev icon" className="min-w-5 h-5" />
        ) : (
          <img src="/prev-dark.png" alt="prev icon" className="min-w-5 h-5" />
        )}
      </div>
      <div className="py-1 px-2.5 bg-[rgba(28,28,28,0.05)] dark:bg-[rgba(255,255,255,0.1)] rounded-lg text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)]">
        1
      </div>
      <div className="py-1 px-2.5 rounded-lg text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)]">
        2
      </div>
      <div className="py-1 px-2.5 rounded-lg text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)]">
        3
      </div>
      <div className="py-1 px-2.5 rounded-lg text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)]">
        5
      </div>
      <div className="py-1 px-2.5 rounded-lg text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)]">
        5
      </div>
      <div className="p-1">
        {theme === "light" ? (
          <img src="/next.png" alt="next icon" className="min-w-5 h-5" />
        ) : (
          <img src="/next-dark.png" alt="next icon" className="min-w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default Pagination;
