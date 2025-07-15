interface ContactCardProps {
  picture: string;
  name: string;
}

const ContactCard = ({ picture, name }: ContactCardProps) => {
  return (
    <div className="flex items-center gap-2 p-1">
      <img
        src={picture}
        alt={`${name} profile picture`}
        className="min-w-6 h-6 rounded-full"
      />
      <h4 className="text-sm font-normal leading-5 truncate max-w-[192px] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
        {name}
      </h4>
    </div>
  );
};

export default ContactCard;
