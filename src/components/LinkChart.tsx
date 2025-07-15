import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../contexts/ThemeContextUtils";

const data = [
  { name: "Jan", blue: 7, blackSolid: 13, blackDashed: null },
  { name: "Feb", blue: 19, blackSolid: 6, blackDashed: null },
  { name: "Mar", blue: 15, blackSolid: 10, blackDashed: null },
  { name: "Apr", blue: 12, blackSolid: 19, blackDashed: 19 },
  { name: "May", blue: 14, blackSolid: null, blackDashed: 22 },
  { name: "Jun", blue: 25, blackSolid: null, blackDashed: 21 },
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
            dataKey="blue"
            stroke="rgba(168,197,218,1)"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="blackSolid"
            stroke="rgba(28, 28, 28, 1)"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            connectNulls
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="blackDashed"
            stroke="rgba(28, 28, 28, 1)"
            strokeDasharray="6 6"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinkChart;
