/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Upload,
  Tag,
  Drawer,
  Divider,
  Descriptions,
  Space,
} from "antd";
import {
  FaEye,
  FaImage,
  FaPencilAlt,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { RxCrossCircled, RxDotsVertical } from "react-icons/rx";
import { BsExclamationCircle, BsShieldCheck } from "react-icons/bs";
import {
  DownOutlined,
  SearchOutlined,
  LinkOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import icon from "../../assets/image/leaf.png";
import icon1 from "../../assets/image/edu.png";
import icon2 from "../../assets/image/health.png";

const COVER =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop";

const BusinessPortfolio = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    {
      key: "1",
      name: "Green Bites",
      email: "hello@greenbites.com",
      icon: icon,
      sector: "Food & Dining",
      status: "Active",
      phone: "+61 234 567 890",
      website: "https://www.greenbites.com",
      address: "45 Oxford St, Sydney, Australia",
      overview:
        "Trusted business offering food & dining rewards to the Crescent Change community.",
      offeredRewards:
        "Trusted business offering food & dining rewards to the Crescent Change community.",
      verified: true,
    },
    {
      key: "2",
      name: "EduTech Hub",
      email: "info@edutech.com",
      icon: icon1,
      sector: "Education",
      status: "Pending",
      phone: "+61 200 111 222",
      website: "https://www.edutech.com",
      address: "12 College Rd, Melbourne, Australia",
      overview: "Turning hope into opportunity through education.",
      offeredRewards: "Free Coding Course (Silver, 1x per donor)",
      verified: false,
    },
    {
      key: "3",
      name: "HealthFirst Labs",
      email: "support@hflabs.org",
      icon: icon2,
      sector: "Healthcare",
      status: "Inactive",
      phone: "+61 333 777 999",
      website: "https://www.hflabs.org",
      address: "88 Wellness Ave, Brisbane, Australia",
      overview: "Affordable diagnostics for community health.",
      offeredRewards: "10% off annual screening",
      verified: false,
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ icon: file });
    return false;
  };

  const handleEdit = (record) => {
    setSelectedBusiness(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      sector: record.sector,
      status: record.status,
    });
    setPreviewImage(record.icon);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
  };

  const handleSave = (values) => {
    if (!selectedBusiness) return;
    const updatedData = data.map((item) =>
      item.key === selectedBusiness.key
        ? { ...item, ...values, icon: previewImage || item.icon }
        : item
    );
    setData(updatedData);
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const openProfile = (record) => {
    setSelectedBusiness(record);
    setIsProfileOpen(true);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Active":
        return (
          <Tag color="green" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <FaCheckCircle /> Active
          </Tag>
        );
      case "Pending":
        return (
          <Tag color="gold" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <BsExclamationCircle /> Pending
          </Tag>
        );
      default:
        return (
          <Tag color="red" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <RxCrossCircled /> Inactive
          </Tag>
        );
    }
  };

  const filteredData = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.sector.toLowerCase().includes(q) ||
        d.status.toLowerCase().includes(q)
    );
  }, [searchText, data]);

  const columns = [
    {
      title: "Business",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.icon}
            alt={record.name}
            className="h-10 w-10 object-contain rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-gray-500 text-sm">{record.email}</span>
          </div>
        </div>
      ),
    },
    { title: "Sector", dataIndex: "sector", key: "sector" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2 text-lg">
          <div
            onClick={() => openProfile(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
            title="View profile"
          >
            <FaEye />
          </div>
          <div
            onClick={() => handleEdit(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
            title="Edit"
          >
            <FaPencilAlt />
          </div>
          <div
            onClick={() => handleDelete(record.key)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer text-red-500"
            title="Delete"
          >
            <RxCrossCircled />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Business Portfolio</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-60"
            allowClear
          />
          <Button>
            Filter <DownOutlined />
          </Button>
          <button className="flex justify-center items-center gap-2 bg-white px-6 py-2 rounded-3xl border">
            <FaPlus /> Add
          </button>
          <RxDotsVertical />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Business"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
      >
          <Form layout="vertical" form={form} onFinish={handleSave} >
          <div className="flex justify-center mb-4">
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <div className="border border-dashed border-gray-300 p-4 rounded-full cursor-pointer flex flex-col items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <>
                    <FaImage className="text-gray-400 h-8 w-8" />
                    <p className="text-gray-400 text-sm mt-2">Upload Icon</p>
                  </>
                )}
              </div>
            </Upload>
          </div>

          <Form.Item name="name" label="Business Name" rules={[{ required: true }]}>
            <Input placeholder="Enter business name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
            <Input placeholder="Enter sector" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input placeholder="Active / Pending / Inactive" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Right-side Profile Drawer */}
      <Drawer
        title="Business Profile"
        placement="right"
        width={520}
        
        onClose={() => setIsProfileOpen(false)}
        open={isProfileOpen}
        destroyOnClose
      >
        {selectedBusiness && (
          <div className="p-4">
            <div className="rounded-xl overflow-hidden mb-4">
              <img src={COVER} alt="cover" className="w-full h-40 object-cover" />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={selectedBusiness.icon}
                alt={selectedBusiness.name}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base">{selectedBusiness.name}</span>
                  {selectedBusiness.verified && (
                    <span
                      title="Verified"
                      className="inline-flex items-center gap-1 text-green-600 text-xs font-medium"
                    >
                      <BsShieldCheck /> Verified
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-xs">Sydney, Australia</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {selectedBusiness.overview || "No overview provided."}
            </p>

            <Divider />

            <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small" colon={false}>
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  <a href={`mailto:${selectedBusiness.email}`}>
                    {selectedBusiness.email}
                  </a>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                <Space>
                  <PhoneOutlined />
                  <a href={`tel:${selectedBusiness.phone || ""}`}>
                    {selectedBusiness.phone || "—"}
                  </a>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                <Space>
                  <LinkOutlined />
                  {selectedBusiness.website ? (
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedBusiness.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "—"
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <Space>
                  <EnvironmentOutlined />
                  {selectedBusiness.address || "—"}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="mb-2 font-semibold">Offered Rewards</div>
            <p className="text-gray-600 text-sm">
              {selectedBusiness.offeredRewards || "No rewards listed."}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BusinessPortfolio;
