// import { DatePicker, Select } from "antd";
// import { FaArrowDown } from "react-icons/fa";
// import { DownOutlined } from "@ant-design/icons";
const DonorsSubscription = () => {
  // const { Option } = Select;
  return (
    <div className="p-6 bg-white border rounded-3xl">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-semibold">Export Subscription Data</h1>
        <p className="text-neutral-400">
          Track all subscriptions, manage invoices, and export payment data.Download a full report of all active and inactive subscriptions.   </p>
      </div> */}

      {/* <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center justify-center gap-2 text-neutral-400">
            <p>FIlter subscription data by </p>
            <Select
              defaultValue="All"
              style={{ width: 130 }}
              //   onChange={handleRoleFilter}
              suffixIcon={<DownOutlined />}
            >
              <Option value="All">All</Option>
              <Option value="Business">Business</Option>
              <Option value="Organization">Organization</Option>
              <Option value="Donor">Donor</Option>
            </Select>
            <p>and</p>
            <div className="flex gap-2 justify-items-center">
              <DatePicker placeholder="Start Date"></DatePicker>
              <DatePicker placeholder="End Date"></DatePicker>
            </div>
          </div>
        </div>
        <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-3xl">
          <FaArrowDown /> Export
        </button>
      </div> */}
    </div>
  );
};

export default DonorsSubscription;
