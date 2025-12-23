import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useCreateBadgeMutation } from "../../redux/feature/badge/badgeApis";
import { useGetCauseCategoriesQuery } from "../../redux/feature/cause/causeApis";

const { TextArea } = Input;

const UNLOCK_TYPE_OPTIONS = [
  { value: "donation_count", label: "Donation Count" },
  { value: "donation_amount", label: "Donation Amount" },
  { value: "category_specific", label: "Category Specific" },
  { value: "round_up", label: "Round-Up Count" },
  { value: "round_up_amount", label: "Round-Up Amount" },
  { value: "recurring_streak", label: "Recurring Streak" },
  { value: "donation_size", label: "Donation Size" },
  { value: "frequency", label: "Monthly Frequency" },
  { value: "unique_categories", label: "Unique Categories" },
  { value: "time_based", label: "Time Based" },
  { value: "seasonal", label: "Seasonal" },
];

const DEFAULT_TIERS = [
  { tier: "colour", name: "", requiredCount: undefined, requiredAmount: undefined },
  { tier: "bronze", name: "", requiredCount: undefined, requiredAmount: undefined },
  { tier: "silver", name: "", requiredCount: undefined, requiredAmount: undefined },
  { tier: "gold", name: "", requiredCount: undefined, requiredAmount: undefined },
];

const SMART_DEFAULTS = {
  donation_count: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3 },
      { tier: "silver", name: "Silver", requiredCount: 6 },
      { tier: "gold", name: "Gold", requiredCount: 10 },
    ],
  },
  donation_amount: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredAmount: 50 },
      { tier: "bronze", name: "Bronze", requiredAmount: 100 },
      { tier: "silver", name: "Silver", requiredAmount: 250 },
      { tier: "gold", name: "Gold", requiredAmount: 500 },
    ],
  },
  category_specific: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3, requiredAmount: 50 },
      { tier: "silver", name: "Silver", requiredCount: 6, requiredAmount: 100 },
      { tier: "gold", name: "Gold", requiredCount: 10, requiredAmount: 200 },
    ],
  },
  round_up: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3 },
      { tier: "silver", name: "Silver", requiredCount: 6 },
      { tier: "gold", name: "Gold", requiredCount: 10 },
    ],
  },
  round_up_amount: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredAmount: 20 },
      { tier: "bronze", name: "Bronze", requiredAmount: 50 },
      { tier: "silver", name: "Silver", requiredAmount: 100 },
      { tier: "gold", name: "Gold", requiredAmount: 200 },
    ],
  },
  recurring_streak: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3 },
      { tier: "silver", name: "Silver", requiredCount: 6 },
      { tier: "gold", name: "Gold", requiredCount: 12 },
    ],
  },
  donation_size: {
    conditionLogic: "or",
    maxDonationAmount: 5,
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 5 },
      { tier: "bronze", name: "Bronze", requiredCount: 10 },
      { tier: "silver", name: "Silver", requiredCount: 15 },
      { tier: "gold", name: "Gold", requiredCount: 20 },
    ],
  },
  frequency: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3 },
      { tier: "silver", name: "Silver", requiredCount: 6 },
      { tier: "gold", name: "Gold", requiredCount: 12 },
    ],
  },
  unique_categories: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 5 },
      { tier: "bronze", name: "Bronze", requiredCount: 8 },
      { tier: "silver", name: "Silver", requiredCount: 12 },
      { tier: "gold", name: "Gold", requiredCount: 15 },
    ],
  },
  time_based: {
    conditionLogic: "or",
    timeRange: { start: 0, end: 4 },
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3 },
      { tier: "silver", name: "Silver", requiredCount: 5 },
      { tier: "gold", name: "Gold", requiredCount: 10 },
    ],
  },
  seasonal: {
    conditionLogic: "or",
    tiers: [
      { tier: "colour", name: "Colour", requiredCount: 1 },
      { tier: "bronze", name: "Bronze", requiredCount: 3, requiredAmount: 50 },
      { tier: "silver", name: "Silver", requiredCount: 5, requiredAmount: 100 },
      { tier: "gold", name: "Gold", requiredCount: 10, requiredAmount: 200 },
    ],
  },
};

const validationHintMap = {
  category_specific: "⚠️ Categories are required",
  seasonal: "⚠️ Seasonal period is required",
  time_based: "⚠️ Time range is required",
  donation_size: "⚠️ Maximum amount is required",
};

const SEASONAL_PERIOD_OPTIONS = [
  { label: "Ramadan", value: "ramadan" },
  { label: "Laylat Al Qadr", value: "laylat_al_qadr" },
  { label: "Dhul Hijjah", value: "dhul_hijjah" },
  { label: "Winter", value: "winter" },
  { label: "Fitrah Deadline", value: "fitrah_deadline" },
];

const TIER_ORDER = ["one-tier", "colour", "bronze", "silver", "gold"];
const PROGRESSION_ORDER = ["colour", "bronze", "silver", "gold"];

const CreateBadgeModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [createBadge, { isLoading }] = useCreateBadgeMutation();

  const unlockType = Form.useWatch("unlockType", form);

  const shouldShowCategories = unlockType === "category_specific" || unlockType === "seasonal";
  const shouldShowTimeRange = unlockType === "time_based";
  const shouldShowDonationSize = unlockType === "donation_size";
  const shouldShowSeasonalPeriod = unlockType === "seasonal";

  const validationHint = unlockType ? validationHintMap[unlockType] : null;

  const { data: causeCategoriesRes, isLoading: isCauseCategoriesLoading } = useGetCauseCategoriesQuery(
    undefined,
    { skip: !open || !shouldShowCategories }
  );

  const causeCategoryOptions = useMemo(() => {
    const list = causeCategoriesRes?.data;
    if (!Array.isArray(list)) return [];
    return list
      .filter((c) => c?.value)
      .map((c) => ({ label: c.label || c.value, value: c.value }));
  }, [causeCategoriesRes]);

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
        return false;
      },
      onChange: (info) => {
        const nextList = Array.isArray(info?.fileList) ? info.fileList.slice(-1) : [];
        setFileList(nextList);
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
    } else {
      const currentTiers = form.getFieldValue("tiers");
      if (!Array.isArray(currentTiers) || currentTiers.length === 0) {
        form.setFieldsValue({ tiers: DEFAULT_TIERS });
      }
    }
  }, [open, form]);

  useEffect(() => {
    if (!open) return;

    if (!unlockType) return;

    const defaults = SMART_DEFAULTS[unlockType];

    if (defaults) {
      const existingTiers = form.getFieldValue("tiers");
      const mergedTiers = Array.isArray(existingTiers) && existingTiers.length
        ? existingTiers.map((t) => {
            const d = defaults.tiers?.find((x) => x.tier === t.tier);
            if (!d) return t;
            return { ...t, ...d };
          })
        : DEFAULT_TIERS.map((t) => {
            const d = defaults.tiers?.find((x) => x.tier === t.tier);
            return d ? { ...t, ...d } : t;
          });

      const additionalFields = {};
      if (defaults.timeRange) additionalFields.timeRange = defaults.timeRange;
      if (typeof defaults.maxDonationAmount === "number") {
        additionalFields.maxDonationAmount = defaults.maxDonationAmount;
      }

      form.setFieldsValue({
        conditionLogic: defaults.conditionLogic,
        tiers: mergedTiers,
        ...additionalFields,
      });
    } else {
      const existingLogic = form.getFieldValue("conditionLogic");
      if (!existingLogic) {
        form.setFieldsValue({ conditionLogic: "or" });
      }
    }

    if (unlockType !== "category_specific" && unlockType !== "seasonal") {
      form.setFieldsValue({ specificCategories: undefined });
    }
    if (unlockType !== "seasonal") {
      form.setFieldsValue({ seasonalPeriod: undefined });
    }
    if (unlockType !== "time_based") {
      form.setFieldsValue({ timeRange: undefined });
    }
    if (unlockType !== "donation_size") {
      form.setFieldsValue({ minDonationAmount: undefined, maxDonationAmount: undefined });
    }
  }, [unlockType, open, form]);

  const handleSubmit = async (values) => {
    const iconFile = fileList?.[0]?.originFileObj;
    if (!iconFile) {
      message.error("Please upload a badge icon");
      return;
    }

    if (
      typeof values?.minDonationAmount === "number" &&
      typeof values?.maxDonationAmount === "number" &&
      values.minDonationAmount > values.maxDonationAmount
    ) {
      message.error("Minimum donation amount cannot be greater than maximum");
      return;
    }

    try {
      const payload = {
        name: values.name,
        description: values.description,
        unlockType: values.unlockType,
        conditionLogic: values.conditionLogic,
        tiers: values.tiers || [],
        isActive: values.isActive ?? true,
        featured: values.featured ?? false,
      };

      if (typeof values.priority === "number") {
        payload.priority = values.priority;
      }

      if (shouldShowCategories) {
        payload.specificCategories = Array.isArray(values.specificCategories)
          ? values.specificCategories
          : [];
      }

      if (shouldShowTimeRange) {
        payload.timeRange = {
          start: values?.timeRange?.start ?? 0,
          end: values?.timeRange?.end ?? 0,
        };
      }

      if (shouldShowDonationSize) {
        if (typeof values.minDonationAmount === "number") {
          payload.minDonationAmount = values.minDonationAmount;
        }
        if (typeof values.maxDonationAmount === "number") {
          payload.maxDonationAmount = values.maxDonationAmount;
        }
      }

      if (shouldShowSeasonalPeriod && values.seasonalPeriod) {
        payload.seasonalPeriod = values.seasonalPeriod;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("icon", iconFile);

      await createBadge(formData).unwrap();
      message.success("Badge created successfully");
      onClose();
    } catch (err) {
      message.error(err?.data?.message || "Failed to create badge");
    }
  };

  return (
    <Modal
      title="Create Badge"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={({ errorFields }) => {
          const first = Array.isArray(errorFields) ? errorFields[0] : null;
          const firstMsg = first?.errors?.[0];
          message.error(firstMsg || "Please fix the highlighted fields and try again");
        }}
        scrollToFirstError
      >
        {validationHint ? (
          <Alert type="info" showIcon className="mb-4" message={validationHint} />
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            label="Badge Name"
            name="name"
            rules={[{ required: true, message: "Badge name is required" }]}
          >
            <Input placeholder="e.g., Midnight Giver" />
          </Form.Item>

          <Form.Item
            label="Unlock Type"
            name="unlockType"
            rules={[{ required: true, message: "Unlock type is required" }]}
          >
            <Select
              placeholder="Select unlock type"
              options={UNLOCK_TYPE_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Condition Logic"
            name="conditionLogic"
            rules={[{ required: true, message: "Condition logic is required" }]}
          >
            <Select
              placeholder="Select logic"
              options={[
                { value: "or", label: "OR" },
                { value: "and", label: "AND" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Priority" name="priority">
            <InputNumber className="w-full" min={0} placeholder="Optional" />
          </Form.Item>

          <Form.Item label="Active" name="isActive" valuePropName="checked" initialValue>
            <Switch />
          </Form.Item>

          <Form.Item label="Featured" name="featured" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={4} placeholder="Describe what this badge represents..." />
        </Form.Item>

        <Form.Item label="Badge Icon" required>
          <Upload {...uploadProps} listType="picture" showUploadList>
            <Button icon={<UploadOutlined />}>Upload Icon</Button>
          </Upload>
        </Form.Item>

        {shouldShowCategories && (
          <Form.Item
            label="Specific Categories"
            name="specificCategories"
            rules={
              unlockType === "category_specific"
                ? [{ required: true, message: "Categories are required" }]
                : []
            }
          >
            <Select
              mode={causeCategoryOptions.length ? "multiple" : "tags"}
              tokenSeparators={[","]}
              placeholder="Select categories"
              options={causeCategoryOptions}
              loading={isCauseCategoriesLoading}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        )}

        {shouldShowSeasonalPeriod && (
          <Form.Item
            label="Seasonal Period"
            name="seasonalPeriod"
            rules={[{ required: true, message: "Seasonal period is required" }]}
          >
            <Select
              placeholder="Select seasonal period"
              options={SEASONAL_PERIOD_OPTIONS}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        )}

        {shouldShowDonationSize && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item label="Min Donation Amount" name="minDonationAmount">
              <InputNumber className="w-full" min={0} placeholder="Optional" />
            </Form.Item>
            <Form.Item
              label="Max Donation Amount"
              name="maxDonationAmount"
              rules={[{ required: true, message: "Maximum amount is required" }]}
            >
              <InputNumber className="w-full" min={0} placeholder="Required" />
            </Form.Item>
          </div>
        )}

        {shouldShowTimeRange && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              label="Time Range Start"
              name={["timeRange", "start"]}
              rules={[{ required: true, message: "Start time is required" }]}
            >
              <InputNumber className="w-full" min={0} max={23} />
            </Form.Item>
            <Form.Item
              label="Time Range End"
              name={["timeRange", "end"]}
              rules={[{ required: true, message: "End time is required" }]}
            >
              <InputNumber className="w-full" min={0} max={23} />
            </Form.Item>
          </div>
        )}

        <div className="p-4 mt-2 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900">Tiers</div>
              <div className="text-xs text-gray-500">
                Add tier requirements (count/amount as needed).
              </div>
            </div>
            <Button
              onClick={() => {
                const current = form.getFieldValue("tiers") || [];
                if (current.length >= 4) return;
                form.setFieldsValue({
                  tiers: [
                    ...current,
                    {
                      tier: "",
                      name: "",
                      requiredCount: undefined,
                      requiredAmount: undefined,
                    },
                  ],
                });
              }}
              disabled={(form.getFieldValue("tiers") || []).length >= 4}
            >
              Add Tier
            </Button>
          </div>

          <Form.List
            name="tiers"
            rules={[
              {
                validator: async (_rule, tiers) => {
                  if (!Array.isArray(tiers) || tiers.length === 0) {
                    throw new Error("At least one tier is required");
                  }
                  if (tiers.length > 4) {
                    throw new Error("Maximum 4 tiers allowed");
                  }

                  // Single tier must be one-tier
                  if (tiers.length === 1 && tiers[0]?.tier !== "one-tier") {
                    throw new Error('Single tier badges must use "one-tier"');
                  }

                  // Each tier must have at least one requirement > 0
                  for (const t of tiers) {
                    const count = Number(t?.requiredCount || 0);
                    const amount = Number(t?.requiredAmount || 0);
                    if (!(count > 0 || amount > 0)) {
                      throw new Error(
                        "At least one requirement (Count or Amount) must be greater than 0"
                      );
                    }
                  }

                  // Tier order validation
                  const tierNames = tiers.map((t) => t?.tier);
                  const invalidTier = tierNames.find((t) => !TIER_ORDER.includes(t));
                  if (invalidTier) {
                    throw new Error("Invalid tier type");
                  }

                  // For multi-tier, enforce progression colour->bronze->silver->gold
                  if (tiers.length > 1) {
                    const indices = tierNames.map((t) => PROGRESSION_ORDER.indexOf(t));
                    if (indices.some((i) => i === -1)) {
                      throw new Error("Multi-tier badges must use colour/bronze/silver/gold");
                    }
                    for (let i = 1; i < indices.length; i++) {
                      if (!(indices[i] > indices[i - 1])) {
                        throw new Error("Tiers must be in correct progression order");
                      }
                    }
                  }
                },
              },
            ]}
          >
            {(fields, { remove }) => (
              <div className="space-y-3">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="grid grid-cols-1 gap-3 p-3 bg-white border rounded-lg md:grid-cols-5"
                  >
                    <Form.Item
                      {...field}
                      label="Tier"
                      name={[field.name, "tier"]}
                      rules={[{ required: true, message: "Tier is required" }]}
                    >
                      <Select
                        options={[
                          { value: "one-tier", label: "One-tier" },
                          { value: "colour", label: "Colour" },
                          { value: "bronze", label: "Bronze" },
                          { value: "silver", label: "Silver" },
                          { value: "gold", label: "Gold" },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Name"
                      name={[field.name, "name"]}
                      rules={[{ required: true, message: "Name is required" }]}
                      className="md:col-span-2"
                    >
                      <Input placeholder="e.g., Night Giver" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Required Count"
                      name={[field.name, "requiredCount"]}
                    >
                      <InputNumber className="w-full" min={0} />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Required Amount"
                      name={[field.name, "requiredAmount"]}
                    >
                      <InputNumber className="w-full" min={0} />
                    </Form.Item>

                    <div className="flex items-end">
                      <Button danger onClick={() => remove(field.name)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Form.List>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={isLoading}
          >
            Create Badge
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBadgeModal;
