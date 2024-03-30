import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 bg-gray-100">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
          Restaurant
        </span>
      </Link>

      <form>
        {/* <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        /> */}
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <span className="block text-sm font-medium truncate mr-2 mt-2">
          Traveller
        </span>

        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">@userName</span>
            <span className="block text-sm font-medium truncate">email</span>
          </Dropdown.Header>
          <Link to={"/dashboard?tab=restaurant"}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
        </Dropdown>
      </div>
      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Restaurants</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/packages"} as={"div"}>
          <Link to="/packages">Packages</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
