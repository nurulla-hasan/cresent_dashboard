import { DatePicker, Select } from "antd";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
const DonorsSubscription = () => {
  const { Option } = Select;
  return (
    <div className="p-6 bg-white rounded-3xl border">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Subscription & Payments</h1>
        <p className="text-neutral-400">
          Track all subscriptions, manage invoices, and export payment data.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex justify-center items-center gap-2 text-neutral-400">
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
            <div className="flex justify-items-center gap-2">
              <DatePicker placeholder="Start Date"></DatePicker>
              <DatePicker placeholder="End Date"></DatePicker>
            </div>
          </div>
        </div>
        <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
          <FaArrowDown /> Export
        </button>
      </div>
    </div>
  );
};

export default DonorsSubscription;
