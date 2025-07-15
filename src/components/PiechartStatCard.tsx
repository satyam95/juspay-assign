interface PiechartStatCardProps {
  color: string;
  title: string;
  value: string;
}
const PiechartStatCard = ({ color, title, value }: PiechartStatCardProps) => {
  return (
    <div className="flex items-center justify-between py-0.5">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-4 h-4">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `${color}` }}
          />
        </div>
        <div className="text-xs leading-[18px] font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">{title}</div>
      </div>
      <div className="text-xs leading-[18px] font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] min-w-[53px] transition-colors duration-200">
        {value}
      </div>
    </div>
  );
};

export default PiechartStatCard;
