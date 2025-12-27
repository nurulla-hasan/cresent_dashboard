"use client";
import profile from "../../../assets/image/Donation.png";
import star from "../../../assets/image/star.png";
import calender from "../../../assets/image/calender.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      img: profile,
      title: "Donation",
      key: "donation",
    },
    {
      id: 2,
      img: calender,
      title: "Subscriptions",
      key: "subscriptions",
    },
    {
      id: 3,
      img: star,
      title: "Rewards",
      key: "rewards",
    },
  ];

  const [active, setActive] = useState("donation");

  const handleClick = (key) => {
    setActive(key);

    if (key === "donation") {
      navigate("/donationQuickLink");
    }else if(key==="subscriptions"){
      navigate("/subscriptions")
    }else{
        navigate("/rewards") 
    }

  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-3">Quick Links</h1>
      <div className="grid grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className={`bg-white border border-gray-100 p-4 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer transition hover:bg-gray-50 ${
              active === item.key ? "ring-1 ring-gray-200" : ""
            }`}
            onClick={() => handleClick(item.key)}
          >
            <img src={item.img} alt={item.title} className="h-7 w-7 mb-2" />
            <p className="text-xs font-semibold text-gray-900">{item.title}</p>
          </div>
        ))}
      </div>

      {/* ✅ Also render DonationQuickLink when active */}
      {/* {active === "donation" && <DonationQuickLink />} */}
    </div>
  );
};

export default QuickLinks;
