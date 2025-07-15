import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../contexts/ThemeContextUtils";

const data = [
  {
    name: "Jan",
    uv: 3,
    pv: 18,
  },
  {
    name: "Feb",
    uv: 6,
    pv: 21,
  },
  {
    name: "Mar",
    uv: 3,
    pv: 19,
  },
  {
    name: "Apr",
    uv: 7,
    pv: 22,
  },
  {
    name: "May",
    uv: 3,
    pv: 16,
  },
  {
    name: "Jun",
    uv: 7,
    pv: 21,
  },
];
const CustomXTick = ({
  x,
  y,
  payload,
  theme,
}: {
  x: number;
  y: number;
  payload: { value: string };
  theme: string;
}) => {
  return (
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
};

const CustomYTick = ({
  x,
  y,
  payload,
  theme,
}: {
  x: number;
  y: number;
  payload: { value: number };
  theme: string;
}) => {
  return (
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
};

const StackBarChart = () => {
  const { theme } = useTheme();
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
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
            stroke={theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(28, 28, 28, 0.2)"}
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
          <Bar
            barSize={20}
            dataKey="pv"
            stackId="a"
            isAnimationActive={false}
            fill="rgba(168,197,218,1)"
          />
          <Bar
            barSize={20}
            dataKey="uv"
            stackId="a"
            isAnimationActive={false}
            fill="rgba(168,197,218,0.5)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackBarChart;
