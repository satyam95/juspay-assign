import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../contexts/ThemeContextUtils";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<Payload<ValueType, NameType>>;
  coordinate?: { x: number; y: number };
  theme: string;
}

const data = [
  { name: "Jan", PW: 7, CW: 13, CWD: null },
  { name: "Feb", PW: 19, CW: 6, CWD: null },
  { name: "Mar", PW: 15, CW: 10, CWD: null },
  { name: "Apr", PW: 12, CW: 19, CWD: 19 },
  { name: "May", PW: 14, CW: null, CWD: 22 },
  { name: "Jun", PW: 25, CW: null, CWD: 21 },
];

export const CustomXTick = ({
  x,
  y,
  payload,
  theme,
}: {
  x: number;
  y: number;
  payload: { value: string };
  theme: string;
}) => (
  <text
    x={x}
    y={y + 10}
    textAnchor="middle"
    fontSize={12}
    fontWeight={400}
    fill={
      theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(28, 28, 28, 0.4)"
    }
  >
    {payload.value}
  </text>
);

export const CustomYTick = ({
  x,
  y,
  payload,
  theme,
}: {
  x: number;
  y: number;
  payload: { value: number };
  theme: string;
}) => (
  <text
    x={x}
    y={y}
    textAnchor="end"
    fontSize={12}
    fontWeight={400}
    fill={
      theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(28, 28, 28, 0.4)"
    }
  >
    {payload.value === 0 ? "0" : `${payload.value}M`}
  </text>
);

export const CustomSectorTooltip = ({
  active,
  payload,
  coordinate,
  theme,
}: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    return (
      <div
        style={{
          position: "absolute",
          left: coordinate.x + 25,
          top: coordinate.y,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10,
          backdropFilter: "blur(40px)",
          backgroundColor: `${
            theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(28,28,28,0.8)"
          }`,
        }}
        className="py-1 px-1.5 rounded-lg w-19"
      >
        <div className="text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal">
          {payload[0].payload.name}
        </div>
        <div className="text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal">
          {payload[0].name}: {payload[0].value}M
        </div>
        <div className="text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal">
          {payload[1].name}: {payload[1].value}M
        </div>
      </div>
    );
  }
  return null;
};

const LinkChart = () => {
  const { theme } = useTheme();
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            horizontal
            stroke={
              theme === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(28, 28, 28, 0.05)"
            }
            strokeWidth={1}
          />
          <Tooltip
            cursor={false}
            content={(props) => (
              <CustomSectorTooltip {...props} theme={theme} />
            )}
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            stroke={
              theme === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(28, 28, 28, 0.2)"
            }
            tick={(props) => <CustomXTick {...props} theme={theme} />}
          />
          <YAxis
            width={35}
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
            axisLine={false}
            tickLine={false}
            tick={(props) => <CustomYTick {...props} theme={theme} />}
          />

          <Line
            type="monotone"
            dataKey="PW"
            stroke="rgba(168,197,218,1)"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="CW"
            stroke="rgba(28,28,28,1)"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="CWD"
            stroke="rgba(28,28,28,1)"
            strokeDasharray="6 6"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "rgba(28,28,28,1)",
              stroke: "rgba(28,28,28,1)",
              strokeWidth: 0,
            }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinkChart;
