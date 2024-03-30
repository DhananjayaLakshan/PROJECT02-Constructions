import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function DashAppointment() {
  const [restaurants, setRestaurants] = useState([]); // Renamed to restaurants for clarity

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get("/api/restaurant");
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/restaurant/${id}`);
        setRestaurants((currentRestaurants) =>
          currentRestaurants.filter((p) => p._id !== id)
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6">
      <h1 className="text-4xl mb-10">Appointments</h1>

      <Card className="max-w-4xl">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex justify-end gap-3">
          <div>
            <Button color="blue">View</Button>
          </div>
          <div className="mr-5">
            <Button color="blue">Confirm</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
