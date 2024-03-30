import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../image/logo.png";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 bg-gray-900">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <img src={logo} alt="logo" className="h-14" />
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
        <span className="block text-sm text-white font-medium truncate mr-2 mt-2">
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
          <Link to={"/dashboard?tab=client"}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
        </Dropdown>
      </div>
      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className="text-white hover:text-inherit active:text-inherit"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link
            to="/"
            className="text-white hover:text-inherit active:text-inherit"
          >
            Packages
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/" className="text-white hover:text-inherit">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/" className="text-white hover:text-inherit">
            Tenders
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
