import ActivityCard from "./ActivityCard";
import ContactCard from "./ContactCard";
import NotificationCard from "./NotificationCard";

const NotificationSidebar = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm leading-5 font-semibold px-1 py-2 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          Notifications
        </div>
        <NotificationCard
          type="bug"
          icon="/bug.png"
          iconAlt="bug icon"
          title="You have a bug that needs to be fixed."
          time="Just now"
        />
        <NotificationCard
          type="update"
          icon="/user.png"
          iconAlt="update icon"
          title="New user registered"
          time="59 minutes ago"
        />
        <NotificationCard
          type="bug"
          icon="/bug.png"
          iconAlt="bug icon"
          title="You have a bug that needs to be fixed."
          time="12 hours ago"
        />
        <NotificationCard
          type="update"
          icon="/broadcast.png"
          iconAlt="update icon"
          title="Andi Lane subscribed to you"
          time="Today, 11:59 AM"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm leading-5 font-semibold px-1 py-2 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          Activities
        </div>
        <div className="flex flex-col gap-2">
          <ActivityCard
            icon="/act1.png"
            alt="profile picture"
            title="You have a bug that needs to be fixed."
            time="Just now"
          />
          <ActivityCard
            icon="/act2.png"
            alt="profile picture"
            title="Released a new version"
            time="59 minutes ago"
          />
          <ActivityCard
            icon="/act3.png"
            alt="profile picture"
            title="Submitted a bug"
            time="12 hours ago"
          />
          <ActivityCard
            icon="/act4.png"
            alt="profile picture"
            title="Modified A data in Page X"
            time="Today, 11:59 AM"
          />
          <ActivityCard
            icon="/act5.png"
            alt="profile picture"
            title="Deleted a page in Project X"
            time="Feb 2, 2023"
            isLast
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm leading-5 font-semibold px-1 py-2 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          Contacts
        </div>
        <ContactCard picture="/user1.png" name="Natali Craig" />
        <ContactCard picture="/user2.png" name="Drew Cano" />
        <ContactCard picture="/user3.png" name="Orlando Diggs" />
        <ContactCard picture="/user4.png" name="Andi Lane" />
        <ContactCard picture="/user5.png" name="Kate Morrison" />
        <ContactCard picture="/user6.png" name="Koray Okumus" />
      </div>
    </div>
  );
};

export default NotificationSidebar;
