import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateClient() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get(`/api/client?clientId=${id}`);
        setFormData(data.client[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, [id]);

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/client/${id}`, formData);
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-5"
      >
        <h1 className="text-center text-3xl my-7 font-semibold">New Clent</h1>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="text"
            placeholder="Client name"
            required
            name="name"
            className="flex-1"
            value={formData.name}
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Address"
            required
            name="address"
            className="flex-1"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="text"
            placeholder="projectID"
            required
            name="projectID"
            className="flex-1"
            value={formData.projectID}
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Contact number"
            required
            name="phone"
            className="flex-1"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <TextInput
            type="text"
            placeholder="Documents"
            required
            name="documents"
            className="flex-1"
            value={formData.documents}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Link to="/dashboard?tab=client">
              <Button type="button" color="dark">
                Back
              </Button>
            </Link>
          </div>
          <div>
            <Button type="submit" color="blue">
              Save
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
