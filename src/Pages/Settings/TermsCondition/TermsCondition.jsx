/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TermsCondition = () => {
    const [value, setValue] = useState('');
    const handleSubmit = async () => {

    };
    return (
        <div className="mx-2 mb-10">

            <div className="">

                {/* show about data */}

                <ReactQuill
                    style={{ height: 600 }}
                    theme="snow"
                    value={value}
                    onChange={setValue} />


                <button
                    className="px-10 py-3 mt-20  md:my-16 rounded bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center"
                    type="submit"
                >
                    Save
                </button>

            </div>

        </div>
    );
};

export default TermsCondition;