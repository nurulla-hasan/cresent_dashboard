import { DatePicker, Input, Table, } from "antd";
import icon from "../../assets/image/leaf.png";
import { SearchOutlined } from "@ant-design/icons";
import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetBusinessesRewardQuery } from "../../redux/feature/business/businessApis";
const BusinessReview = () => {
  const { RangePicker } = DatePicker;

  const {
    data,
    pagination,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    setFilterParams,
  } = useSmartFetchHook(useGetBusinessesRewardQuery);

  const columns = [
     {
    title: "Business",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record?.icon || icon}
          alt={record.name}
          className="object-contain w-12 h-12 rounded-full"
        />
        <span className="font-semibold">{record.name}</span>
      </div>
    ),
  },
    {
      title: "Active Rewards",
      dataIndex: "rewardTotal",
      key: "rewardTotal",
    },
    {
      title: "Total Redemptions",
      dataIndex: "totalRedemption",
      key: "totalRedemption",
    },
    {
      title: "Top Rewards",
      dataIndex: "topReward",
      key: "topReward",
      render: (topReward) => (
        <span className="">
          {typeof topReward === "string" ? topReward : topReward?.name || topReward?.title || "-"}
        </span>
      ),
    },
  ];
  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">🏢 Business Rewards</h2>
           <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
            disabled={isLoading}
          />
          <RangePicker
            placeholder={["From date", "To date"]}
            onChange={(_dates, dateStrings) => {
              const [fromDate, toDate] = dateStrings || [];
              setFilterParams({
                fromDate: fromDate || undefined,
                toDate: toDate || undefined,
              });
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: pagination?.page || currentPage,
          pageSize: pagination?.limit || 5,
          total: pagination?.total || 0,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey={(record) => record?._id || record?.id}
      />
    </div>
  );
};

export default BusinessReview;
