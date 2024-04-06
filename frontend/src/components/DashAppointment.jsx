import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IoTrashBinOutline } from "react-icons/io5";
import { CgAlbum } from "react-icons/cg";

export default function DashAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("/api/appointment");
        setAppointments(data.appointment);
        setTotalAppointments(data.totalAppointments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  console.log(appointments);

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
        const res = await axios.delete(`/api/appointment/${id}`);
        setAppointments((currentAppointment) =>
          currentAppointment.filter((p) => p._id !== id)
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      const formdata = { status: "successfull" };
      const res = await axios.put(`/api/appointment/${id}`, formdata);
      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: "successful" }
            : appointment
        )
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6">
      <h1 className="text-4xl mb-10">Appointments</h1>

      <div className="flex gap-2 ml-3">
        <Card href="#" className="max-w-sm mb-5">
          <div className="flex ">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-medium">Total Appointments</span>
            </p>
            <CgAlbum className="ml-48 text-6xl" />
          </div>
          <h1 className="text-4xl">{totalAppointments}</h1>
        </Card>
      </div>

      {appointments.map((appointment, index) => (
        <Card key={index} className="max-w-4xl mb-7 ml-3">
          <div className="flex justify-end">
            <a
              onClick={() => {
                handleDelete(appointment._id);
              }}
              className=" font-medium text-red-600 hover:underline ml-7 cursor-pointer"
            >
              <IoTrashBinOutline className="text-2xl" />
            </a>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="mr-4">{appointment.date}</span>
            <span>{appointment.time}</span>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Name:</span> {appointment.fullName}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Contact Number:</span>{" "}
            {appointment.phone}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Company Name:</span>{" "}
            {appointment.companyName}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Message:</span>
          </p>
          <p>{appointment.fullName}</p>
          <div
            className={`${
              appointment.status === "pending" ? "bg-blue-200" : "bg-green-200"
            } w-max rounded pl-1 pe-2`}
          >
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-medium">{appointment.status}</span>
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <div className="mr-5">
              <Button
                color="blue"
                disabled={appointment.status === "successfull"}
                onClick={() => {
                  handleUpdate(appointment._id);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
