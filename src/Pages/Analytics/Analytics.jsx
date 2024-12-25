import AnalyticsInfo from "../../Components/Dashboard/AnalyticsInfo/AnalyticsInfo";
import UserGrowth from "../../Components/Dashboard/UserGrowth/UserGrowth";

const Analytics = () => {
    return (
        <div>
            <AnalyticsInfo />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <UserGrowth />
                {/* <EarningStatistics /> */}
            </div>

        </div>
    );
};

export default Analytics;