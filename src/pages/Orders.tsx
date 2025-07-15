import React from "react";
import Checkbox from "../components/Checkbox";
import StatusBadge from "../components/StatusBadge";
import { OrdersData } from "../data/OrdersData";
import Pagination from "../components/Pagination";
import { useTheme } from "../contexts/ThemeContext";

const Orders: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="p-7">
      <div className="space-y-4">
        <div className="text-sm leading-5 font-semibold px-2 py-1 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          Order List
        </div>
        <div className="space-y-3">
          <div className="bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] flex items-center justify-between rounded-lg p-2 transition-colors duration-200">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7">
                {theme === "light" ? (
                  <img
                    src="/plus.png"
                    alt="plus icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/plus-dark.png"
                    alt="plus icon"
                    className="min-w-5 h-5"
                  />
                )}
              </div>
              <div className="flex items-center justify-center w-7 h-7">
                {theme === "light" ? (
                  <img
                    src="/filter.png"
                    alt="filter icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/filter-dark.png"
                    alt="filter icon"
                    className="min-w-5 h-5"
                  />
                )}
              </div>
              <div className="flex items-center justify-center w-7 h-7">
                {theme === "light" ? (
                  <img
                    src="/sort.png"
                    alt="sort icon"
                    className="min-w-5 h-5"
                  />
                ) : (
                  <img
                    src="/sort-dark.png"
                    alt="sort icon"
                    className="min-w-5 h-5"
                  />
                )}
              </div>
            </div>
            <div className="h-7 w-40 border border-[rgba(28,28,28,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(28,28,28,0.4)] rounded-lg">
              <div className="flex items-center w-full py-1 px-2 gap-1">
                {theme === "light" ? (<img
                  src="/searchFilter.png"
                  alt="search icon"
                  className="min-w-4 h-4"
                />):(<img
                  src="/searchFilter-dark.png"
                  alt="search icon"
                  className="min-w-4 h-4"
                />)}
                
                <input
                  placeholder="Search"
                  className="flex-1 w-full h-full text-sm leading-5 placeholder:text-sm placeholder:text-[rgba(28,28,28,0.2)] dark:placeholder:text-[rgba(255,255,255,0.2)] text-[rgba(28,28,28,0.2) dark:text-[rgba(255,255,255,0.2)] font-normal focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full">
                <thead className="w-full">
                  <tr className="w-full border-b border-[rgba(28,28,28,0.2)] dark:border-[rgba(255,255,255,0.2)] transition-colors duration-200">
                    <th className="min-w-[24px] text-left flex items-center justify-center py-3">
                      <Checkbox />
                    </th>
                    <th className="min-w-[100px] text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      Order ID
                    </th>
                    <th className="min-w-[215px] text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      User
                    </th>
                    <th className="min-w-[214px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      Project
                    </th>
                    <th className="min-w-[270px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      Address
                    </th>
                    <th className="min-w-[191px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      Date
                    </th>
                    <th className="min-w-[110px] text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] transition-colors duration-200">
                      Status
                    </th>
                    <th className="min-w-[48px] text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {OrdersData.map((item, index) => (
                    <tr
                      key={index}
                      className="w-full hover:bg-[rgba(247,249,251,1)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded-lg border-b border-[rgba(28,28,28,0.05)] dark:border-[rgba(255,255,255,0.1)] transition-colors duration-200"
                    >
                      <th className="min-w-[24px] text-left flex items-center justify-center py-3">
                        {item.selectable.display && (
                          <Checkbox checked={item.selectable.checked} />
                        )}
                      </th>
                      <th className="min-w-[100px] text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                        {item.orderId}
                      </th>
                      <th className="min-w-[215px] text-left text-xs leading-[18px] font-normal px-3 py-2 text-[rgba(28,28,28,1)]">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.user.img}
                            alt={`${item.user.name} image`}
                            className="min-w-6 h-6 rounded-full"
                          />
                          <div className="text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200 text-xs leading-[18px] font-normal">
                            {item.user.name}
                          </div>
                        </div>
                      </th>
                      <th className="min-w-[214px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                        {item.project}
                      </th>
                      <th className="min-w-[270px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                        {item.address}
                      </th>
                      <th className="min-w-[191px]  text-left text-xs leading-[18px] font-normal p-3 text-[rgba(28,28,28,1)]">
                        <div className="flex items-center gap-1">
                          {theme === "light" ? (<img
                            src="/date.png"
                            alt="calendar icon"
                            className="min-w-4 h-4"
                          />):(<img
                            src="/date-dark.png"
                            alt="calendar icon"
                            className="min-w-4 h-4"
                          />)}
                          
                          <div className="text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200 text-xs leading-[18px] font-normal">
                            {item.date}
                          </div>
                        </div>
                      </th>
                      <th className="min-w-[110px] text-left text-xs leading-[18px] font-normal px-2 py-3 text-[rgba(28,28,28,1)]">
                        <StatusBadge status={item.status} />
                      </th>
                      <th className="min-w-[48px] px-3 py-2">
                        {item.more && (
                          <div className="w-6 h-6 flex items-center justify-center">
                            {theme === "light" ? (<img
                              src="/three.png"
                              alt="more icon"
                              className="min-w-4 h-4"
                            />):(<img
                              src="/three-dark.png"
                              alt="more icon"
                              className="min-w-4 h-4"
                            />)}
                            
                          </div>
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
