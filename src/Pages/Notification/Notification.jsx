import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 2,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 3,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 4,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 5,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 6,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 7,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
        {
            id: 8,
            title: "A new order has arrived",
            time: "8:00am, today",
            details: "A new content has been uploaded to car study",
        },
    ]);

    const handleDelete = (id) => {
        setNotifications(
            notifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <div className="p-6">
            {/* Page Header */}
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>

            {/* Notifications List */}
            <div className="border rounded-md shadow-sm">
                {notifications.map((notification, index) => (
                    <div
                        key={notification.id}
                        className={`flex justify-between items-center px-4 py-3 border-b ${index % 2 === 0 ? "bg-orange-50" : "bg-white"
                            }`}
                    >
                        <div>
                            <p className="text-sm font-bold">{notification.title}</p>
                            <p className="text-sm text-gray-500">{notification.details}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-400">{notification.time}</p>
                            <button
                                className="text-primary hover:text-primiary"
                                onClick={() => handleDelete(notification.id)}
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <button className="text-sm text-gray-500 hover:underline">
                    Previous
                </button>
                <div className="flex items-center space-x-2">
                    <button className="text-sm text-primary font-semibold">1</button>
                    <button className="text-sm text-gray-500 hover:underline">2</button>
                    <button className="text-sm text-gray-500 hover:underline">3</button>
                    <span className="text-sm text-gray-500">...</span>
                    <button className="text-sm text-gray-500 hover:underline">100</button>
                </div>
                <button className="text-sm text-gray-500 hover:underline">Next</button>
            </div>
        </div>
    );
};

export default Notifications;
