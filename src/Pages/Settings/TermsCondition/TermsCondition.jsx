 

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Button, Spin, message } from "antd";

import { useGetContentQuery, useUpdateContentMutation } from '../../../redux/feature/content/contentApis';

const TermsCondition = () => {
    const [value, setValue] = useState('');

    const { data, isFetching, isError } = useGetContentQuery();
    const [updateContent, { isLoading }] = useUpdateContentMutation();

    useEffect(() => {
        const next = data?.data?.termsCondition;
        if (typeof next === "string") {
            setValue(next);
        }
    }, [data?.data?.termsCondition]);

    const handleSubmit = async () => {
        try {
            await updateContent({ termsCondition: value }).unwrap();
            message.success("Terms condition updated successfully");
        } catch (err) {
            message.error(err?.data?.message || "Failed to update terms condition");
        }
    };
    return (
        <div className="mx-2 mb-10">
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Terms Condition</h1>
            <p className="mb-6 text-gray-500">
                Update the terms condition shown to users.
            </p>

            <div className="p-4 bg-white shadow rounded-xl">
                {isError ? (
                    <div className="flex items-center justify-center min-h-[420px]">
                        <p className="text-sm text-gray-600">Failed to load terms condition.</p>
                    </div>
                ) : isFetching ? (
                    <div className="flex items-center justify-center min-h-[420px]">
                        <Spin />
                    </div>
                ) : (
                    <div className="min-h-[420px]">
                        <ReactQuill
                            style={{ height: 520 }}
                            theme="snow"
                            value={value}
                            onChange={setValue} />
                    </div>
                )}

                <div className="flex justify-end mt-20">
                    <Button type="primary" onClick={handleSubmit} loading={isLoading} disabled={isFetching || isError}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TermsCondition;