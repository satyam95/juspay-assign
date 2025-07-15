interface CountryProgressProps {
  name: string;
  stat: string;
  fill: string;
}
const CountryProgressBar = ({ name, stat, fill }: CountryProgressProps) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex items-center justify-between">
        <div className="text-xs leading-[18px] font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">{name}</div>
        <div className="text-xs leading-[18px] font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">{stat}</div>
      </div>
      <div className="relative">
        <div className="h-0.5 w-full bg-[rgba(255,255,255,0.4)] rounded-full" />
        <div
          className="absolute top-0 left-0 h-0.5 bg-[rgba(168,197,218,1)] rounded-full" style={{width: `${fill}%`}}
        />
      </div>
    </div>
  );
};

export default CountryProgressBar;
