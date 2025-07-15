interface NotificationCardProps {
  type: string;
  icon: string;
  iconAlt: string;
  title: string;
  time: string;
}
const NotificationCard = ({
  type,
  icon,
  iconAlt,
  title,
  time,
}: NotificationCardProps) => {
  return (
    <div className="flex flex-row gap-2 p-1 hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-sm cursor-pointer">
      <div
        className={`min-w-6 h-6 rounded-lg flex items-center justify-center ${
          type == "bug"
            ? "bg-[rgba(227,245,255,1)]"
            : "bg-[rgba(229,236,246,1)]"
        }`}
      >
        <img src={icon} alt={iconAlt} className="w-4 h-4 object-contain" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-normal leading-5 truncate max-w-[192px] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          {title}
        </h4>
        <p className="text-xs font-normal leading-[18px] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
          {time}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
