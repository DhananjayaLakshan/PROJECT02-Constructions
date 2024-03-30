import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function DashRestaurant() {
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
      <div className="mb-5 ml-1">
        <Link to="/create-restaurant">
          <Button outline>
            <IoIosAddCircleOutline className="mr-2 text-xl" />
            ADD RESTAURANT
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Restaurant Name</Table.HeadCell>
          <Table.HeadCell>Restaurant Owner</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {restaurants.map((res, index) => (
            <Table.Row key={index} className="bg-slate-200">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                <img
                  src={res.image}
                  alt={res.restaurantName}
                  style={{ width: "100px", height: "auto" }}
                />
              </Table.Cell>
              <Table.Cell>{res.restaurantName}</Table.Cell>
              <Table.Cell>{res.ownerName}</Table.Cell>
              <Table.Cell>{res.location}</Table.Cell>
              <Table.Cell>{res.description}</Table.Cell>
              <Table.Cell>
                <a
                  href={`/update-restaurant/${res._id}`}
                  className="font-medium text-cyan-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  onClick={() => {
                    handleDelete(res._id);
                  }}
                  className="font-medium text-red-600 hover:underline ml-7 cursor-pointer"
                >
                  Delete
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
