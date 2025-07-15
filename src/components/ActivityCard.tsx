interface ActivityCardProps {
  icon: string;
  alt: string;
  title: string;
  time: string;
  isLast?: boolean;
}
const ActivityCard = ({
  icon,
  alt,
  title,
  time,
  isLast = false,
}: ActivityCardProps) => {
  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute z-0 top-9 left-4 w-px h-[14px] bg-[rgba(28,28,28,0.1)] dark:bg-[rgba(255,255,255,0.1)]" />
      )}
      <div className="flex gap-2 p-1 z-20 cursor-pointer">
        <img src={icon} alt={alt} className="min-w-6 h-6 rounded-full" />
        <div className="flex flex-col">
          <h4 className="text-sm font-normal hover:font-medium leading-5 truncate max-w-[192px] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
            {title}
          </h4>
          <p className="text-xs font-normal leading-[18px] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
