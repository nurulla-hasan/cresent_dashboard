
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
const { Option } = Select;

import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetAllCauseQuery, useUpdateCauseMutation, useGetCauseCategoriesQuery, useChangeCauseStatusMutation, useCreateCauseMutation } from "../../redux/feature/cause/causeApis";
import { useGetOrganizationReportQuery } from "../../redux/feature/organization/organizationApis";
import { getImageUrl, SuccessToast, ErrorToast } from "../../lib/utils.js";

const CauseManagement = () => {
  const {
    data,
    pagination,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
  } = useSmartFetchHook(useGetAllCauseQuery);

  const [updateCause, { isLoading: isUpdating }] = useUpdateCauseMutation();
  const { data: categoriesRes, isLoading: isCatLoading } = useGetCauseCategoriesQuery();
  const [changeStatus, { isLoading: isStatusUpdating }] = useChangeCauseStatusMutation();
  const [createCause, { isLoading: isCreating }] = useCreateCauseMutation();
  const { data: orgRes, isLoading: isOrgLoading } = useGetOrganizationReportQuery({ page: 1, limit: 50 });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();



  /** Open Edit Modal */
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue({
      name: record?.name || "",
      category: record?.category || undefined,
      description: record?.description || "",
    });
    setIsModalVisible(true);
  };

  /** Open Create Modal */
  const handleAdd = () => {
    setIsEditing(false);
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  /** Change status to any of: pending | verified | suspended */
  const handleChangeStatus = async (id, status) => {
    try {
      await changeStatus({ id, status }).unwrap();
      SuccessToast("Status updated");
    } catch (e) {
      ErrorToast(e?.data?.message || "Failed to update status");
    }
  };

  /** Close Modal */
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    setEditingRecord(null);
    form.resetFields();
  };

  /** Submit Update */
  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        category: values.category,
        description: values.description,
        organizationId: values.organizationId,
      };

      if (isEditing && editingRecord?._id) {
        await updateCause({ id: editingRecord._id, payload }).unwrap();
        SuccessToast("Cause updated successfully");
      } else {
        await createCause(payload).unwrap();
        SuccessToast("Cause created successfully");
      }
      handleCancel();
    } catch (e) {
      ErrorToast(e?.data?.message || "Failed to update cause");
    }
  };

  /** � Table Columns */
  const columns = [
    {
      title: "Cause Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={getImageUrl(record?.organization?.logoImage) || ""}
            alt={record.name}
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-sm text-gray-400">
              {record?.createdAt ? new Date(record.createdAt).toLocaleDateString() : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (description) => (
        <span className="text-sm text-gray-600">
          {description || "-"}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: (categoriesRes?.data || []).map((c) => ({ text: c.label, value: c.value })),
      onFilter: (value, record) => record.category === value,
      render: (value) => (
        <div className="flex items-center gap-2 px-4 py-2 rounded-3xl">
          <div className="flex items-center gap-1 px-4 py-1 text-slate-700 bg-slate-100 rounded-2xl">
            {value}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Verified", value: "verified" },
        { text: "Suspended", value: "suspended" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Select
          size="small"
          value={record.status}
          style={{ width: 140 }}
          loading={isStatusUpdating}
          onChange={(v) => handleChangeStatus(record._id, v)}
        >
          <Option value="pending">Pending</Option>
          <Option value="verified">Verified</Option>
          <Option value="suspended">Suspended</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3 text-lg">
          <div className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100">
            <VscEye />
          </div>
          <div
            onClick={() => handleEdit(record)}
            className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100"
          >
            <FaPencilAlt />
          </div>
        </div>
      ),
    },
  ];


  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Cause Management</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search causes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1 px-4 py-1 bg-white border rounded-3xl"
          >
            <FaPlus /> Add Cause
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: pagination?.page || currentPage,
          pageSize: pagination?.limit || 10,
          total: pagination?.total || 0,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
      />

      {/* Add/Edit Cause Modal */}
      <Modal
        title={isEditing ? "Edit Cause" : "Add Cause"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Cause Name"
            rules={[{ required: true, message: "Please enter cause name" }]}
          >
            <Input placeholder="Enter cause name" />
          </Form.Item>

          {!isEditing && (
            <Form.Item
              name="organizationId"
              label="Organization"
              rules={[{ required: true, message: "Please select an organization" }]}
            >
              <Select placeholder="Select organization" loading={isOrgLoading} showSearch optionFilterProp="children">
                {(orgRes?.data || []).map((o) => (
                  <Option key={o._id} value={o._id}>{o.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category" loading={isCatLoading} showSearch optionFilterProp="children">
              {(categoriesRes?.data || []).map((c) => (
                <Option key={c.value} value={c.value}>{c.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Discard Changes</Button>
            <Button type="primary" htmlType="submit" loading={isEditing ? isUpdating : isCreating}>
              {isEditing ? "Update Cause" : "Create Cause"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CauseManagement;
