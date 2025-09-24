import profile from "../../../assets/image/Donation.png";
import star from "../../../assets/image/star.png";
import calender from "../../../assets/image/calender.png";

const QuickLinks = () => {
  const data = [
    {
      id: 1,
      img: profile,
      title: "Donation",
      link:""
    },
    {
      id: 2,
      img: calender,
      title: "Subscriptions",
      link:""
    },
    {
      id: 3,
      img: star,
      title: "Rewards",
      link:""
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium mb-2">Quick Links</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-3xl flex flex-col items-center gap-2 cursor-pointer"
          >
          
            <img
              src={item.img}
              alt={item.title}
              className=" mb-4 font-semibold"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
