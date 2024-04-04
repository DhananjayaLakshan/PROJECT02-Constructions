import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Profile() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser._id);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `/api/appointment?userId=${currentUser._id}`
        );
        setAppointments(data.appointment);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [currentUser._id]);

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6">
      <h1 className="text-4xl mb-10">Appointments</h1>

      {appointments.map((appointment, index) => (
        <Card key={index} className="max-w-4xl mb-7 ml-3">
          {/* <div className="flex justify-end">
            <a
              onClick={() => {
                handleDelete(appointment._id);
              }}
              className=" font-medium text-red-600 hover:underline ml-7 cursor-pointer"
            >
              <IoTrashBinOutline className="text-2xl" />
            </a>
          </div> */}
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
          {/* <div className="flex justify-end gap-3">
        <div>
          <Button color="blue">View</Button>
        </div>
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
      </div> */}
        </Card>
      ))}
    </div>
  );
}
