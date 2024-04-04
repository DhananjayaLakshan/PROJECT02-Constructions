import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../image/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

      {currentUser && (
        <div className="flex gap-2 md:order-2">
          <span className="block text-sm text-white font-medium truncate mr-2 mt-2">
            {currentUser && currentUser.userName}
          </span>

          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{currentUser && currentUser.userName}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser && currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser && currentUser.isAdmin && (
              <Link to={"/dashboard?tab=client"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            )}
            <Link to={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
          </Dropdown>
        </div>
      )}
      <Navbar.Toggle />

      {currentUser && (
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
      )}
    </Navbar>
  );
}
