import React from "react";
import { useTheme } from "../contexts/ThemeContextUtils";

import StatsCard from "../components/StatsCard";
import StackBarChart from "../components/StackBarChart";
import CountryProgressBar from "../components/CountryProgressBar";
import { LineChartLegend } from "../components/LineChartLegend";
import LinkChart from "../components/LinkChart";
import CustomPieChart from "../components/CustomPieChart";
import PiechartStatCard from "../components/PiechartStatCard";
import SellingProductsTable from "../components/SellingProductsTable";

const Home: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="p-7">
      <div className="space-y-4">
        <div className="text-sm leading-5 font-semibold px-2 py-1 text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
          eCommerce
        </div>
        <div className="flex flex-col space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <div className="grid grid-cols-2 gap-7">
              <StatsCard
                color="blue"
                name="Customers"
                number="3,781"
                growth="+11.01%"
                growthType="up"
              />
              <StatsCard
                color="light"
                name="Orders"
                number="1,219"
                growth="-0.03%"
                growthType="down"
              />
              <StatsCard
                color="light"
                name="Revenue"
                number="$695"
                growth="+15.03%"
                growthType="up"
              />
              <StatsCard
                color="purple"
                name="Growth"
                number="30.1%"
                growth="+6.08%"
                growthType="up"
              />
            </div>
            <div className="h-[252px] sm:h-auto bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] rounded-2xl transition-colors duration-200">
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="text-sm leading-5 font-semibold text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                  Projections vs Actuals
                </div>
                <div className="flex-1">
                  <StackBarChart />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-7">
            <div className="w-full sm:w-[84.03%] bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] rounded-2xl h-[318px] transition-colors duration-200">
              <div className="p-6 flex flex-col gap-4 h-[318px] sm:h-full">
                <div className="flex items-center gap-4">
                  <div className="text-sm leading-5 font-semibold text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                    Revenue
                  </div>
                  <div className="text-sm leading-5 font-normal text-[rgba(28,28,28,0.2)] dark:text-[rgba(255,255,255,0.2)] transition-colors duration-200">
                    |
                  </div>
                  <LineChartLegend
                    color="rgba(28,28,28,1)"
                    text="Current Week"
                    boldText="$58,211"
                  />
                  <LineChartLegend
                    color="rgba(168,197,218,1)"
                    text="Previous Week"
                    boldText="$68,768"
                  />
                </div>
                <div className="flex-1">
                  <LinkChart />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[14.03%] sm:min-w-[202px] bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] rounded-2xl transition-colors duration-200">
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="text-sm leading-5 font-semibold text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                  Revenue by Location
                </div>
                {theme === "light" ? (
                  <img src="/map.png" alt="map image" className="w-full" />
                ) : (
                  <img src="/map-dark.png" alt="map image" className="w-full" />
                )}
                <CountryProgressBar name="New York" stat="72K" fill="70" />
                <CountryProgressBar name="San Francisco" stat="39K" fill="30" />
                <CountryProgressBar name="Sydney" stat="25K" fill="40" />
                <CountryProgressBar name="Singapore" stat="61K" fill="55" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-7">
            <div className="w-full sm:w-[84.03%] bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] rounded-2xl transition-colors duration-200">
              <div className="p-6 flex flex-col gap-1 h-full">
                <div className="text-sm leading-5 font-semibold text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                  Top Selling Products
                </div>
                <SellingProductsTable />
              </div>
            </div>
            <div className="w-full sm:w-[14.03%] sm:min-w-[202px] bg-[rgba(247,249,251,1)] dark:bg-[rgba(255,255,255,0.05)] rounded-2xl transition-colors duration-200">
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="text-sm leading-5 font-semibold text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] transition-colors duration-200">
                  Total Sales
                </div>
                <div className="h-36">
                  <CustomPieChart />
                </div>
                <div className="flex flex-col gap-3">
                  <PiechartStatCard
                    color="rgba(28,28,28,1)"
                    title="Direct"
                    value="$300.56"
                  />
                  <PiechartStatCard
                    color="rgba(186, 237, 189, 1)"
                    title="Affilliate"
                    value="$135.18"
                  />
                  <PiechartStatCard
                    color="rgba(149, 164, 252, 1)"
                    title="Sponsored"
                    value="$154.02"
                  />
                  <PiechartStatCard
                    color="rgba(177, 227, 255, 1)"
                    title="E-mail"
                    value="$48.96"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
