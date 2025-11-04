import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api/apiService";
import Header from './Header';

export default function RestaurantList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchRestaurants()
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-900">
      <Header />
      <h1 className="text-xl font-semibold mb-4">Nearby Restaurants</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg shadow cursor-pointer overflow-hidden hover:scale-[1.02] transition"
            onClick={() => navigate(`/detail/${r.id}`)}
          >
            <img
              src={r.imageURL}
              alt={r.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-3 space-y-1">
              <h2 className="font-semibold text-lg">{r.name}</h2>
              {r.address && (
                <p className="text-sm text-gray-600">{r.address}</p>
              )}
              <p className="text-sm font-medium">⭐ {r.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
