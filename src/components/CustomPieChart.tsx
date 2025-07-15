import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

const data = [
  { name: "38.46%", value: 500 },
  { name: "23.08%", value: 300 },
  { name: "15.38%", value: 200 },
  { name: "38.50%", value: 500 },
];
const COLORS = [
  "rgba(28,28,28,1)",
  "rgba(149,164,252,1)",
  "rgba(177,227,255,1)",
  "rgba(186,237,189,1)",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<Payload<ValueType, NameType>>;
  coordinate?: { x: number; y: number };
}

const CustomSectorTooltip = ({
  active,
  payload,
  coordinate,
}: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    return (
      <div
        style={{
          position: "absolute",
          left: coordinate.x,
          top: coordinate.y,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10,
          backdropFilter: "blur(40px)",
        }}
        className="bg-[rgba(28,28,28,0.8)] py-1 px-2 rounded-lg text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal"
      >
        {payload[0].name}
      </div>
    );
  }
  return null;
};

const CustomPieChart = () => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          width={120}
          height={120}
          margin={{
            top: 0,
            left: 0,
          }}
        >
          <Pie
            data={data}
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            cornerRadius={7}
            dataKey="value"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomSectorTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
