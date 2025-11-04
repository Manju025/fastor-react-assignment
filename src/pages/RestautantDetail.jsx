import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api/apiService";
import Header from "./Header";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) navigate("/login");

    fetchRestaurants().then((res) => {
      console.log("API result:", res.data);
      const item = res.data.find((r) => String(r.id) === String(id)); 
      console.log("Matched item:", item);
      setRestaurant(item);
    });
  }, [id, navigate]);


  useEffect(() => {
    if (restaurant && (restaurant.images || restaurant.cover_image || restaurant.imageURL)) {
      drawImages();
    }
  }, [restaurant]);

  const drawImages = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;

  const restaurantImg = new Image();
  const logoImg = new Image();

  restaurantImg.crossOrigin = "anonymous";

  const restaurantImgUrl =
    restaurant.images?.[0] ||
    restaurant.cover_image ||
    restaurant.imageURL ||
    "";

  console.log("Restaurant image URL:", restaurantImgUrl);

  let restaurantLoaded = false;
  let logoLoaded = false;

  const draw = () => {
    if (restaurantLoaded && logoLoaded) {
      ctx.drawImage(restaurantImg, 0, 0, canvas.width, canvas.height);
      const size = 90;
      const x = (canvas.width - size) / 2;
      const y = (canvas.height - size) / 2;
      ctx.drawImage(logoImg, x, y, size, size);
    }
  };

  restaurantImg.onload = () => {
    restaurantLoaded = true;
    draw();
  };

  logoImg.onload = () => {
    logoLoaded = true;
    draw();
  };

  restaurantImg.src = restaurantImgUrl;
  logoImg.src = "/fastor-logo.svg";

  restaurantImg.onerror = () => console.log("Restaurant image failed to load");
  logoImg.onerror = () => console.log("Logo failed to load");
};



  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!navigator.share || !canvas) {
      alert("Sharing not supported");
      return;
    }

    try {
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      const file = new File([blob], "Fastor-Restaurant-Pic.png", {
        type: "image/png",
      });

      await navigator.share({
        files: [file],
        title: `Check out ${restaurant.name}`,
        text: "Fastor restaurant share",
      });
    } catch (err) {
      console.log("Share failed", err);
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Header />

      <div className="flex w-full justify-end">
        <button 
          onClick={() => navigate("/list")}
          className="mt-4 text-sm px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-4">{restaurant.name}</h2>

      <canvas
        ref={canvasRef}
        className="border border-gray-600 mt-4 w-[400px] h-[400px] rounded shadow-lg"
      ></canvas>

      <button
        onClick={handleShare}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium shadow"
      >
        Share Image
      </button>
    </div>
  );
};

export default RestaurantDetail;
