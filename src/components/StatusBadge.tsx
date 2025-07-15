import { useTheme } from "../contexts/ThemeContext";

interface StatusBadgeProps {
    status: string;
  }
  
  const StatusBadge = ({ status }: StatusBadgeProps) => {
    const {theme} = useTheme()
    const getColors = (status: string) => {
      switch (status) {
        case "In Progress":
          return {
            dot: "bg-[rgba(149,164,252,1)]",
            text: "text-[rgba(138,140,217,1)]",
          };
        case "Complete":
          return {
            dot: "bg-[rgba(161,227,203,1)]",
            text: "text-[rgba(74,167,133,1)]",
          };
        case "Pending":
          return {
            dot: "bg-[rgba(177,227,255,1)]",
            text: "text-[rgba(89,168,212,1)]",
          };
        case "Approved":
          return {
            dot: "bg-[rgba(255,233,153,1)]",
            text: "text-[rgba(255,197,85,1)]",
          };
        case "Rejected":
          return {
            dot: `bg-[${theme === "light" ? "rgba(28,28,28,0.4)" : "rgba(255,255,255,0.4)"}]`,
            text: `text-[${theme === "light" ? "rgba(28,28,28,0.4)": "rgba(255,255,255,0.2)"}]`,
          };
        default:
          return {
            dot: "bg-gray-300",
            text: "text-gray-400",
          };
      }
    };
  
    const { dot, text } = getColors(status);
  
    return (
      <div className="flex items-center space-x-1.5">
        <div className="w-4 h-4 flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        </div>
        <div className={`text-xs leading-[18px] font-normal ${text}`}>
          {status}
        </div>
      </div>
    );
  };
  
  export default StatusBadge;
  