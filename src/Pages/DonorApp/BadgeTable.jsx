import { useMemo, useState } from "react";
import { Button, Dropdown, Input, Menu, Modal, Table, Tag, message } from "antd";
import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { FaPencilAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useDeleteBadgeMutation, useGetBadgeReportQuery } from "../../redux/feature/badge/badgeApis";
import CreateBadgeModal from "./CreateBadgeModal";
import UpdateBadgeModal from "./UpdateBadgeModal";
const BadgeTable = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const [deleteBadge, { isLoading: isDeleteLoading }] = useDeleteBadgeMutation();

  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [featuredFilter, setFeaturedFilter] = useState(null);
  const [unlockTypeFilter, setUnlockTypeFilter] = useState(null);

  const {
    data,
    pagination,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    setFilterParams,
  } = useSmartFetchHook(useGetBadgeReportQuery);

  const handleView = (record) => {
    setSelectedBadge(record);
    setIsViewOpen(true);
  };

  const handleDelete = (record) => {
    if (!record?._id) return;

    Modal.confirm({
      title: "Delete Badge",
      content: `Are you sure you want to delete \"${record?.name || "this badge"}\"?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      okButtonProps: { loading: isDeleteLoading },
      onOk: async () => {
        try {
          await deleteBadge(record._id).unwrap();
          message.success("Badge deleted successfully");
        } catch (e) {
          const msg = e?.data?.message || "Failed to delete badge";
          message.error(msg);
        }
      },
    });
  };

  const statusTag = (isActive) => (
    <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
  );

  const featuredTag = (featured) => (
    <Tag color={featured ? "blue" : "default"}>{featured ? "Featured" : "Normal"}</Tag>
  );

  const normalizedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((b) => ({
      ...b,
      iconUrl: b?.icon || "",
    }));
  }, [data]);

  const columns = [
    {
      title: "Badge Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Badge Icon",
      dataIndex: "iconUrl",
      key: "icon",
      render: (iconUrl, record) => (
        <img src={iconUrl || ""} alt={record?.name || "badge"} className="object-contain w-12 h-12" />
      ),
    },
    {
      title: "Unlock Type",
      dataIndex: "unlockType",
      key: "unlockType",
      render: (t) => <span className="capitalize">{t || "-"}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (v) => statusTag(v),
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (v) => featuredTag(v),
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3 text-lg">
          <div
            onClick={() => handleView(record)}
            className="flex items-center justify-center w-8 h-8 p-1 text-blue-600 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
            title="View Details"
          >
            <VscEye size={16} />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 p-1 text-yellow-600 bg-yellow-100 rounded-full cursor-pointer hover:bg-yellow-200"
            title="Edit Badge"
            onClick={() => {
              setSelectedBadge(record);
              setIsUpdateOpen(true);
            }}
          >
            <FaPencilAlt size={14} />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 p-1 text-red-600 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
            title="Delete Badge"
            onClick={() => handleDelete(record)}
          >
            <RxCrossCircled size={16} />
          </div>
        </div>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setIsActiveFilter(true);
          setFilterParams({ isActive: true });
        }}
      >
        Active
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setIsActiveFilter(false);
          setFilterParams({ isActive: false });
        }}
      >
        Inactive
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setFeaturedFilter(true);
          setFilterParams({ featured: true });
        }}
      >
        Featured
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setFeaturedFilter(false);
          setFilterParams({ featured: false });
        }}
      >
        Not Featured
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setUnlockTypeFilter("seasonal");
          setFilterParams({ unlockType: "seasonal" });
        }}
      >
        Seasonal
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setUnlockTypeFilter(null);
          setFeaturedFilter(null);
          setIsActiveFilter(null);
          setFilterParams({});
        }}
      >
        Clear Filters
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Badges Management</h2>
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateOpen(true)}
            className="bg-[#1890ff]"
          >
            Create Badge
          </Button>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              Filter <DownOutlined />
            </Button>
          </Dropdown>
          <div className="px-2 text-xs text-gray-500">
            {isActiveFilter !== null || featuredFilter !== null || unlockTypeFilter
              ? "Filters applied"
              : "All"}
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={normalizedData}
        loading={isLoading}
        pagination={{
          current: pagination?.page || currentPage,
          pageSize: pagination?.limit || 10,
          total: pagination?.total || 0,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
      />

      <Modal
        title="Badge Details"
        open={isViewOpen}
        onCancel={() => setIsViewOpen(false)}
        footer={null}
        centered
        width={600}
      >
        {selectedBadge ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedBadge.iconUrl || ""}
                  alt={selectedBadge.name}
                  className="object-contain w-16 h-16 p-2 rounded-xl bg-gray-50"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedBadge.name}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {selectedBadge.unlockType || "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {statusTag(selectedBadge.isActive)}
                {featuredTag(selectedBadge.featured)}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <p className="mb-2 text-sm font-medium text-gray-700">Description</p>
              <p className="text-sm leading-relaxed text-gray-600">
                {selectedBadge.description || "No description provided"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                <p className="text-xs font-medium tracking-wide text-blue-700 uppercase">Priority</p>
                <p className="text-lg font-bold text-gray-900">{selectedBadge.priority ?? 0}</p>
              </div>
              <div className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                <p className="text-xs font-medium tracking-wide text-purple-700 uppercase">Logic</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {selectedBadge.conditionLogic || "-"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="mb-3 text-sm font-medium text-gray-700">Tiers</h4>
              <div className="space-y-2">
                {Array.isArray(selectedBadge.tiers) && selectedBadge.tiers.length ? (
                  selectedBadge.tiers.map((t, idx) => (
                    <div key={`${t.tier}-${idx}`} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{t.tier}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Count: {t.requiredCount}</p>
                        <p className="text-sm font-medium text-gray-900">Amount: {t.requiredAmount}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No tiers</div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <CreateBadgeModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <UpdateBadgeModal
        open={isUpdateOpen}
        badge={selectedBadge}
        onClose={() => setIsUpdateOpen(false)}
      />
    </div>
  );
};

export default BadgeTable;
