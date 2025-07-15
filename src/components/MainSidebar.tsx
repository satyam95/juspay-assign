import AccordionItem from "./AccordionItem";

const MainSidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-1">
        <div className="flex flex-row items-center gap-2">
          <img src="/logo.png" alt="logo" height={24} width={24} />
          <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
            ByeWind
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <div className="flex gap-2 items-center">
          <div className="text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-sm leading-5 font-normal px-2 py-1 transition-colors duration-200">
            Favorites
          </div>
          <div className="text-[rgba(28,28,28,0.2)] dark:text-[rgba(255,255,255,0.2)] text-sm leading-5 font-normal px-2 py-1 transition-colors duration-200">
            Recently
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1">
          <div className="w-4 h-4 flex justify-center items-center">
            <div className="bg-[rgba(28,28,28,0.2)] dark:bg-[rgba(255,255,255,0.2)] w-1.5 h-1.5 rounded-full transition-colors duration-200" />
          </div>
          <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
            Overview
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1">
          <div className="w-4 h-4 flex justify-center items-center">
            <div className="bg-[rgba(28,28,28,0.2)] dark:bg-[rgba(255,255,255,0.2)] w-1.5 h-1.5 rounded-full transition-colors duration-200" />
          </div>
          <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
            Projects
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <div className="text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-sm leading-5 font-normal px-2 py-1 transition-colors duration-200">
          Dashboards
        </div>
        <AccordionItem
          title="Default"
          iconLight="/chart.png"
          iconDark="/chart-dark.png"
          isActive={true}
        />
        <AccordionItem
          title="eCommerce"
          iconLight="/bag.png"
          iconDark="/bag-dark.png"
          items={["Overview"]}
        />
        <AccordionItem
          title="Projects"
          iconLight="/folder.png"
          iconDark="/folder-dark.png"
          items={["Overview"]}
        />
        <AccordionItem
          title="Online Courses"
          iconLight="/book.png"
          iconDark="/book-dark.png"
          items={["Overview"]}
        />
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <div className="text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-sm leading-5 font-normal px-2 py-1 transition-colors duration-200">
          Pages
        </div>
        <AccordionItem
          title="User Profile"
          iconLight="/profile.png"
          iconDark="/profile-dark.png"
          items={[
            "Overview",
            "Projects",
            "Campaigns",
            "Documents",
            "Followers",
          ]}
          isOpenByDefault
        />
        <AccordionItem
          title="Account"
          iconLight="/account.png"
          iconDark="/account-dark.png"
          items={["Overview"]}
        />
        <AccordionItem
          title="Corporate"
          iconLight="/corporate.png"
          iconDark="/corporate-dark.png"
          items={["Overview"]}
        />
        <AccordionItem
          title="Blog"
          iconLight="/blog.png"
          iconDark="/blog-dark.png"
          items={["Overview"]}
        />
        <AccordionItem
          title="Social"
          iconLight="/social.png"
          iconDark="/social-dark.png"
          items={["Overview"]}
        />
      </div>
    </div>
  );
};

export default MainSidebar;
