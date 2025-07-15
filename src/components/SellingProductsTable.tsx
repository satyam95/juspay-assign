import { tableData } from "../data/TableData";

const SellingProductsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="w-full border-b border-[rgba(28,28,28,0.2)] dark:border-[rgba(255,255,255,0.2)] transition-colors duration-200">
            <th className="w-[36.50%] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-xs leading-[18px] font-normal text-left py-3 transition-colors duration-200">
              Name
            </th>
            <th className="w-[21.16%] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
              Price
            </th>
            <th className="w-[21.16%] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
              Quantity
            </th>
            <th className="w-[21.16%] text-[rgba(28,28,28,0.4)] dark:text-[rgba(255,255,255,0.4)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="w-full hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] cursor-pointer">
              <th className="w-[36.50%] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal text-left py-3 transition-colors duration-200">
                {item.name}
              </th>
              <th className="w-[21.16%] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
                {item.price}
              </th>
              <th className="w-[21.16%] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
                {item.quantity}
              </th>
              <th className="w-[21.16%] text-[rgba(28,28,28,1)] dark:text-[rgba(255,255,255,1)] text-xs leading-[18px] font-normal text-left p-3 transition-colors duration-200">
                {item.amount}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellingProductsTable;
