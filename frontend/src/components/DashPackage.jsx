import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function DashPackage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get("/api/package");
        setPackages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
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
        const res = await axios.delete(`/api/package/${id}`);
        setPackages((currentPackages) =>
          currentPackages.filter((p) => p._id !== id)
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2">
      <div className="mb-5 ml-1">
        <Link to="/create-package">
          <Button outline>
            <IoIosAddCircleOutline className="mr-2 text-xl " />
            ADD PACKAGE
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Package Name</Table.HeadCell>
          <Table.HeadCell>Package Details</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {packages.map((pckg, index) => (
            <Table.Row key={index} className="bg-slate-200">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                <img
                  src={pckg.image}
                  alt="package img"
                  style={{ width: "100px", height: "auto" }}
                />
              </Table.Cell>
              <Table.Cell>{pckg.packageName}</Table.Cell>
              <Table.Cell>{pckg.packageDetails}</Table.Cell>
              <Table.Cell>Rs.{pckg.packagePrice}</Table.Cell>
              <Table.Cell>
                <a
                  href={`/update-package/${pckg._id}`}
                  className="font-medium text-cyan-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  onClick={() => {
                    handleDelete(pckg._id);
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
