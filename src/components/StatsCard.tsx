import { useTheme } from "../contexts/ThemeContextUtils";

interface StatsCardProps {
  color: "blue" | "light" | "purple";
  name: string;
  number: string;
  growth: string;
  growthType: "up" | "down";
}

const backgroundColors: Record<
  StatsCardProps["color"],
  { light: string; dark: string }
> = {
  blue: { light: "rgba(227,245,255,1)", dark: "rgba(227,245,255,1)" },
  light: { light: "rgba(247,249,251,1)", dark: "rgba(255, 255, 255, 0.05)" },
  purple: { light: "rgba(229,236,246,1)", dark: "rgba(229,236,246,1)" },
};

const StatsCard = ({
  color,
  name,
  number,
  growth,
  growthType = "up",
}: StatsCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor =
    isDark && color === "light"
      ? "rgba(255, 255, 255, 1)"
      : "rgba(28, 28, 28, 1)";

      const imageSrc =
      isDark && color === "purple"
        ? growthType === "up"
          ? "/up-dark.png"
          : "/down-dark.png"
        : isDark && color === "light"
        ? growthType === "up"
          ? "/up-dark.png"
          : "/down-dark.png"
        : growthType === "up"
        ? "/up.png"
        : "/down.png";

  return (
    <div
      className="rounded-2xl p-6 transform transition-transform duration-200 hover:scale-105"
      style={{
        backgroundColor:
          backgroundColors[color][theme === "dark" ? "dark" : "light"],
      }}
    >
      <div className="space-y-2">
        <div className="text-sm leading-5 font-semibold transition-colors duration-200" style={{ color: textColor }}>{name}</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold transition-colors duration-200" style={{ color: textColor }}>{number}</div>
          <div className="flex items-center gap-1.5">
            <div className="text-xs leading-[18px] font-normal transition-colors duration-200" style={{ color: textColor }}>{growth}</div>
            <img
              src={imageSrc}
              alt={`${growthType} icon`}
              className="min-w-[12.5px] h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
