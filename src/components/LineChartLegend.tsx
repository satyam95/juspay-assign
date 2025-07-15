interface LineChartLegendProps {
  color: string;
  text: string;
  boldText: string;
}
export const LineChartLegend = ({
  color,
  text,
  boldText,
}: LineChartLegendProps) => {
  return (
    <div className="flex items-center pl-1 pr-2">
      <div className="w-4 h-4 flex items-center justify-center">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: `${color}` }}
        />
      </div>
      <div className="text-xs leading-[18px] font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
        {text} <span className="font-semibold">{boldText}</span>
      </div>
    </div>
  );
};
