import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface AccordionItemProps {
  title: string;
  iconLight?: string;
  iconDark?: string;
  items?: string[];
  isActive?: boolean;
  isOpenByDefault?: boolean;
}

const AccordionItem = ({
  title,
  iconLight = "/chart.png",
  iconDark = "/chart-dark.png",
  items = [],
  isActive = false,
  isOpenByDefault = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenByDefault);
  const { theme } = useTheme();

  const hasItems: boolean = items.length > 0;

  useEffect(() => {
    setIsOpen(isOpenByDefault);
  }, [isOpenByDefault]);

  const toggleAccordion = (): void => {
    if (hasItems) {
      setIsOpen(!isOpen);
    }
  };

  const containerClasses: string =
    isActive && !hasItems
      ? "bg-[rgba(28,28,28,0.05)] dark:bg-[rgba(255,255,255,0.1)] py-1 rounded-lg"
      : "py-1 rounded-lg hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)]";
  const indicatorClasses: string =
    isActive && !hasItems
      ? "w-1 h-4 bg-[rgba(28,28,28,1)] dark:bg-[rgba(198,199,248,1)] rounded-sm"
      : "w-1 h-4 rounded-sm";
  const toggleIconSrc: string = hasItems
    ? isOpen
      ? theme === "dark"
        ? "/open-dark.png"
        : "/open.png"
      : theme === "dark"
      ? "/close-dark.png"
      : "/close.png"
    : "";
  const mainIconSrc: string = theme === "dark" ? iconDark : iconLight;

  return (
    <div>
      <div className={containerClasses}>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="flex items-center">
            <div className={indicatorClasses} />
            <div className="w-4 h-4">
              {hasItems && (
                <img
                  src={toggleIconSrc}
                  alt="toggle icon"
                  className="min-w-4 h-4 transition-transform duration-300 ease-in-out"
                />
              )}
            </div>
          </div>
          <div className="w-5 h-5">
            <img src={mainIconSrc} alt="chart icon" className="min-w-5 h-5" />
          </div>
          <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
            {title}
          </div>
        </div>
      </div>
      {hasItems && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {items.map((item, index) => (
            <div key={index} className="py-1 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <div className="w-1 h-4 rounded-sm" />
                  <div className="w-4 h-4"></div>
                </div>
                <div className="w-5 h-5"></div>
                <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-">
                  {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
