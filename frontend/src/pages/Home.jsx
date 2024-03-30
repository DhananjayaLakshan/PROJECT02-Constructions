import { Button } from "flowbite-react";
import hero from "../image/hero.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="w-auto h-auto p-10 mb-48"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-7xl text-white">Diversified Services.</h1>
        <h1 className="text-7xl text-white">Unvarying Quality.</h1>
        <br />
        <br />

        <div className="max-w-xl">
          <p className="text-base text-white">
            iusto, eveniet magni dolore iste praesentium qui. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusantium suscipit
            laudantium alias culpa fugit! Vitae eveniet ab corrupti, sequi
            corporis quibusdam deleniti. Error aut impedit deleniti natus illo
            consectetur laudantium. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Voluptatem ab voluptate commodi dolore sunt. Eius
            quam temporibus cupiditate ea provident, dolorem possimus odit
            iusto, eveniet magni dolore iste praesentium qui. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusantium suscipit
            laudantium alias culpa fugit! Vitae eveniet ab corrupti, sequi
            corporis quibusdam deleniti. Error aut impedit deleniti natus illo
            consectetur laudantium. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Voluptatem ab voluptate commodi dolore sunt. Eius
            quam temporibus cupiditate ea provident, dolorem possimus odit
            iusto, eveniet magni dolore iste praesentium qui.
          </p>
        </div>

        <Link to="/appointment">
          <Button className="mt-5 p-2" color="dark">
            Make an Appointment
          </Button>
        </Link>
      </div>
    </div>
  );
}
