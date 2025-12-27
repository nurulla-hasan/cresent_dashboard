import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useUpdateBadgeMutation } from "../../redux/feature/badge/badgeApis";

const { TextArea } = Input;

const UpdateBadgeModal = ({ open, onClose, badge }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [updateBadge, { isLoading }] = useUpdateBadgeMutation();

  const uploadProps = useMemo(
    () => ({
      fileList,
      maxCount: 1,
      accept: "image/*",
      beforeUpload: (file) => {
        const isImage = file.type?.startsWith("image/");
        if (!isImage) {
          message.error("Please upload an image file");
          return Upload.LIST_IGNORE;
        }
        setFileList([file]);
        return false;
      },
      onRemove: () => {
        setFileList([]);
      },
    }),
    [fileList]
  );

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setFileList([]);
      return;
    }

    if (!badge) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      name: badge?.name,
      description: badge?.description,
      isActive: typeof badge?.isActive === "boolean" ? badge.isActive : true,
      featured: typeof badge?.featured === "boolean" ? badge.featured : false,
      priority: typeof badge?.priority === "number" ? badge.priority : 0,
    });

    setFileList([]);
  }, [open, badge, form]);

  const handleSubmit = async (values) => {
    if (!badge?._id) return;

    const payload = {
      name: values?.name,
      description: values?.description,
      isActive: values?.isActive,
      featured: values?.featured,
      priority: values?.priority,
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));
    if (fileList?.[0]) {
      fd.append("icon", fileList[0]);
    }

    try {
      await updateBadge({ id: badge._id, data: fd }).unwrap();
      message.success("Badge updated successfully");
      onClose?.();
    } catch (e) {
      const msg = e?.data?.message || "Failed to update badge";
      message.error(msg);
    }
  };

  return (
    <Modal
      title="Update Badge"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      destroyOnClose
      className="[&_.ant-modal-content]:!rounded-xl"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          isActive: true,
          featured: false,
          priority: 0,
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            name="name"
            label="Badge Name"
            rules={[{ required: true, message: "Badge name is required" }]}
          >
            <Input placeholder="Enter badge name" />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ type: "number", min: 0, message: "Priority must be 0 or more" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              placeholder="0"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={4} placeholder="Write a short description" />
        </Form.Item>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-sm font-medium text-gray-700">Badge Icon (optional)</div>
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>Upload Icon</Button>
          </Upload>
          <Alert
            className="mt-3"
            type="info"
            showIcon
            message="If you upload an icon, it will replace the existing one. Otherwise, the current icon stays." 
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Badge
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateBadgeModal;
