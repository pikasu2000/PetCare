import { useNavigate } from "react-router-dom";

function ServiceCard({ title, description, image, route }) {
  const navigate = useNavigate();

  const truncateDescription = (text) => {
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="w-full sm:w-1/2 max-w-md bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={image}
        alt={`${title} service`}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">
          {truncateDescription(description)}
        </p>
        <button
          className=" bg-gradient-to-r from-green-300 to-green-500  hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 text-white py-2 px-4 rounded-full transition"
          onClick={() => navigate(route)}
          aria-label={`Find a ${title}`}
        >
          Find {title}
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
