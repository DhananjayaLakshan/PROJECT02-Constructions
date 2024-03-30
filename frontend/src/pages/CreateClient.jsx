import { Button, TextInput, Label, Textarea } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CreateClient() {
  //   const [formData, setFormData] = useState({});
  //   const navigate = useNavigate();
  //   onst handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-5"
      >
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create Package
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="text"
            placeholder="Client name"
            required
            name="name"
            className="flex-1"
            //   onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Address"
            required
            name="address"
            className="flex-1"
            //   onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="number"
            placeholder="projectID"
            required
            name="projectID"
            className="flex-1"
            //   onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Contact number"
            required
            name="phone"
            className="flex-1"
            //   onChange={handleChange}
          />
        </div>

        <div>
          <TextInput
            type="text"
            placeholder="Documents"
            required
            name="documents"
            className="flex-1"
            //   onChange={handleChange}
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
    </div>
  );
}
