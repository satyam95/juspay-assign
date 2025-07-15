import {
  Bar,
  BarChart,
  CartesianGrid,
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
  {
    name: "Jan",
    B: 3,
    A: 18,
  },
  {
    name: "Feb",
    B: 6,
    A: 21,
  },
  {
    name: "Mar",
    B: 3,
    A: 19,
  },
  {
    name: "Apr",
    B: 7,
    A: 22,
  },
  {
    name: "May",
    B: 3,
    A: 16,
  },
  {
    name: "Jun",
    B: 7,
    A: 21,
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
        className="py-1 px-1.5 rounded-lg w-14"
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
          <Tooltip
            cursor={false}
            content={(props) => (
              <CustomSectorTooltip {...props} theme={theme} />
            )}
          />
          <Bar
            barSize={20}
            dataKey="A"
            stackId="a"
            fill="rgba(168,197,218,1)"
          />
          <Bar
            barSize={20}
            dataKey="B"
            stackId="a"
            fill="rgba(168,197,218,0.5)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { CustomXTick, CustomYTick };
export default StackBarChart;
