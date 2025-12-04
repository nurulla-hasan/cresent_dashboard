import { Link } from "react-router-dom";
import user from "../../../assets/image/user.png";


const TopDonors= ({ topDonors = [], recentDonorDocs = [], donationsByCause = [], totalDonation = 0 }) => {
  return (
    <div>
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-2xl font-medium mb-2">Top 05 Donors</h1>
        <p className="text-gray-400 mb-6">Sorted by total donations</p>
        {topDonors.map((item, idx) => (
          <div
            key={`${item.donor}-${idx}`}
            className="flex justify-between items-center gap-2 mb-4"
          >
            <div className="flex justify-start items-center gap-2">
              <p>{idx + 1}</p>
              <img src={user} alt="avatar" />
              <div>
                <h1>{item.donor || "Unknown"}</h1>
                <p className="text-gray-400">{item.since ? `Since: ${new Date(item.since).toLocaleDateString()}` : ""} </p>
              </div>
            </div>
            <div>
              <p>${Number(item.totalAmount ?? 0).toLocaleString()}</p>
              {item.changeText ? (
                <p className="text-green-500">{item.changeText}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {/* recent donors */}
      <div className="bg-white rounded-3xl p-6 border my-3">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-medium mb-2">Recent donors</h1>
          <Link to="/donor-app">
            <button className="text-purple-500 underline ">View All</button>
          </Link>
        </div>

        {recentDonorDocs.map((item, idx) => (
          <div
            key={`${item?.donor?.email || 'unknown'}-${item?.createdAt || 'no-date'}-${idx}`}
            className="flex justify-between items-center gap-2 mb-4"
          >
            <div className="flex justify-start items-center gap-2">
              <img src={user} alt="avatar" />
              <div>
                <h1>{item?.donor?.name || "Unknown"}</h1>
                <p className="text-gray-400">{item?.createdAt ? new Date(item.createdAt).toLocaleString() : ""} </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* breakdown by causes */}
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-xl font-medium">Breakdown by Causes</h1>
        <div className="my-6">
          <p className="text-gray-400">Total Donations</p>
          <h1 className="text-2xl font-medium">
            <span className="text-gray-400">$</span> {Number(totalDonation ?? 0).toLocaleString()}
          </h1>
        </div>
        {Array.isArray(donationsByCause) && donationsByCause.length > 0 ? (
          <>
            <div className="flex justify-between items-center gap-1">
              {donationsByCause.map((c, idx) => {
                const widthPct = totalDonation > 0 ? Math.max(1, Math.round((c.totalAmount / totalDonation) * 100)) : 0;
                const colors = ["bg-pink-200", "bg-blue-200", "bg-yellow-200", "bg-green-200", "bg-purple-200"]; 
                const color = colors[idx % colors.length];
                return (
                  <div key={`${c.cause}-${idx}`} className={`${color} h-12 rounded-2xl`} style={{ width: `${widthPct}%` }}></div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              {donationsByCause.map((c, idx) => {
                const colors = ["bg-pink-200", "bg-blue-200", "bg-yellow-200", "bg-green-200", "bg-purple-200"]; 
                const dot = colors[idx % colors.length];
                return (
                  <div key={`${c.cause}-summary-${idx}`}>
                    <div className="flex justify-start items-center gap-2">
                      <div className={`h-2 w-2 ${dot}`}></div>
                      <p>{c.cause}</p>
                    </div>
                    <h1 className="text-2xl font-medium">
                      <span className="text-gray-400">$</span> {Number(c.totalAmount ?? 0).toLocaleString()}
                    </h1>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TopDonors;
