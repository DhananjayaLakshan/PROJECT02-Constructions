import { Button, TextInput, Label, Textarea } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";

export default function Appointment() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = { ...formData, userId: currentUser._id };

    try {
      await axios.post("/api/appointment", appointmentData);

      navigate("/");
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
        <h1 className="text-center text-3xl my-7 font-semibold">
          MAKE AN APPOINTMENT
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="text"
            placeholder="Full name"
            required
            name="fullName"
            className="flex-1"
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Email"
            required
            name="email"
            className="flex-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="number"
            placeholder="Phone number"
            required
            name="phone"
            className="flex-1"
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Company Name"
            required
            name="companyName"
            className="flex-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <div className="flex-1">
            <div className="mb-2 block ">
              <Label value="Appointment Date" />
            </div>
            <TextInput
              type="date"
              required
              name="date"
              className="flex-1"
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label value="Time" />
            </div>
            <TextInput
              type="time"
              required
              name="time"
              className="flex-1"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Textarea
            name="message"
            placeholder="Message"
            required
            rows={4}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Button type="submit" color="blue">
              <span className="mr-1">Send</span> <FaArrowRightLong />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
