
import { useState } from "react";
import { DatePicker, Input, Table, Spin, Modal, Tag, Divider, Button } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../assets/image/user.png";

import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetDonationReportQuery } from "../../redux/feature/donation/donationApis";

const DonorDataTable = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetDonationReportQuery, { limit: 10 });

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);


  const handleView = (record) => {
    setSelectedDonor(record);
    setIsViewModalVisible(true);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setSelectedDonor(null);
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
    const newParams = {};
    if (dates && dates[0] && dates[1]) {
      newParams.fromDate = dateStrings[0];
      newParams.toDate = dateStrings[1];
    }
    setFilterParams(newParams);
  };

  const columns = [
    {
      title: "Name/Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (_text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt={record.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-sm text-gray-400">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Total Donations",
      dataIndex: "totalDonationAmount",
      key: "totalDonationAmount",
      sorter: true,
      render: (v) => <p className="font-medium">${(v ?? 0).toFixed(2)}</p>,},
    {
      title: <div className="flex items-center gap-2">Badges Earned</div>,
      dataIndex: "badges",
      key: "badges",
      render: (badges = []) => {
        const maxVisible = 3;
        const visibleBadges = badges.slice(0, maxVisible);
        const remainingCount = Math.max(0, badges.length - maxVisible);

        return (
          <div className="relative group">
            <div className="flex flex-wrap gap-1">
              {visibleBadges.map((b, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full w-fit"
                >
                  {b?.badgeName || b?.badge_actual_name || "-"}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="px-2 py-1 text-xs text-gray-400 rounded-full bg-gray-50">
                  +{remainingCount} more
                </span>
              )}
            </div>
            {badges.length > 0 && (
              <div className="absolute z-10 hidden w-48 p-2 mt-1 text-sm bg-white border rounded shadow-lg group-hover:block">
                <div className="flex flex-col gap-1">
                  {badges.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-gray-600 rounded bg-gray-50"
                    >
                      {b?.badgeName || b?.badge_actual_name || "-"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt) => (
        <p className="font-medium">
          {createdAt ? new Date(createdAt).toLocaleString() : "-"}
        </p>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, _record) => (
        <div className="flex items-center justify-center gap-3 text-lg">
          <div
            onClick={() => handleView(_record)}
            className="flex items-center justify-center w-8 h-8 p-1 transition-colors rounded-full cursor-pointer bg-neutral-100 hover:bg-neutral-200"
          >
            <VscEye />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Donors Data</h2>
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
            onChange={handleDateRangeChange}
            value={dateRange}
            disabled={isLoading}
          />
        </div>
      </div>

      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="_id"
          onChange={(tablePagination, filters, sorter) => {
            setCurrentPage(tablePagination.current);

            const newParams = {};
            if (sorter?.field) {
              newParams.sortBy = sorter.field;
              newParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
            }
            setFilterParams(newParams);
          }}
          pagination={{
            current: pagination.page || 1,
            pageSize: pagination.limit || 10,
            total: pagination.total || 0,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: false,
            position: ["bottomRight"],
          }}
        />
      </Spin>

      {/* View Donor Modal */}
      <Modal
        title="Donor Details"
        open={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={[
          <Button key="close" onClick={handleViewCancel}>
            Close
          </Button>
        ]}
        width={600}
        className="donor-view-modal"
      >
        {selectedDonor && (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <img
                src={selectedDonor.image || user}
                alt={selectedDonor.name}
                className="object-cover w-20 h-20 border-2 border-gray-200 rounded-full"
                onError={(e) => { e.target.src = user; }}
              />
              <div>
                <h3 className="text-xl font-semibold">{selectedDonor.name}</h3>
                <p className="text-gray-500">{selectedDonor.email}</p>
                <div className="mt-2">
                  <Tag
                    color={selectedDonor.status === 'verified' ? 'green' : selectedDonor.status === 'pending' ? 'orange' : 'red'}
                    className="capitalize"
                  >
                    {selectedDonor.status}
                  </Tag>
                  <Tag color={selectedDonor.isActive ? 'blue' : 'default'}>
                    {selectedDonor.isActive ? 'Active' : 'Inactive'}
                  </Tag>
                </div>
              </div>
            </div>

            <Divider />

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-500">Phone Number</label>
                <p className="font-medium">{selectedDonor.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-500">Address</label>
                <p className="font-medium">{selectedDonor.address || 'Not provided'}</p>
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-500">State</label>
                <p className="font-medium">{selectedDonor.state || 'Not provided'}</p>
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-500">Postal Code</label>
                <p className="font-medium">{selectedDonor.postalCode || 'Not provided'}</p>
              </div>
            </div>

            <Divider />

            {/* Donation Information */}
            <div>
              <h4 className="mb-3 font-semibold">Donation Information</h4>
              <div className="p-4 rounded-lg bg-blue-50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Donation Amount</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${(selectedDonor.totalDonationAmount).toFixed(2) || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            {selectedDonor.badges && selectedDonor.badges.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold">Badges Earned ({selectedDonor.badges.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDonor.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50"
                    >
                      <p className="text-sm font-medium">{badge.badgeName || badge.badge_actual_name}</p>
                      <p className="text-xs text-gray-500">{badge.currentTier}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <label className="block mb-1 text-gray-500">Joined Date</label>
                <p className="font-medium">
                  {selectedDonor.createdAt ? new Date(selectedDonor.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-gray-500">Last Updated</label>
                <p className="font-medium">
                  {selectedDonor.updatedAt ? new Date(selectedDonor.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonorDataTable;
