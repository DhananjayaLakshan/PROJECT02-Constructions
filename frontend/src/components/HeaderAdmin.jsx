import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import logo from "../image/logo2.png";

export default function HeaderAdmin() {
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);
  const toggleBellPopup = () => setIsBellPopupOpen(!isBellPopupOpen);
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

  const BellPopup = () => (
    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      <ul>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 1
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 2
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 3
        </li>
      </ul>
    </div>
  );

  return (
    <Navbar className="border-b-2 bg-white relative">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <img src={logo} alt="logo" className="h-14" />
      </Link>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {currentUser && (
        <div className="flex gap-2 md:order-2">
          <button onClick={toggleBellPopup} className="relative">
            <FaBell className="mr-4" />
            {isBellPopupOpen && <BellPopup />}
          </button>

          <span className="block text-sm text-black font-medium truncate mr-2 mt-2">
            {currentUser.userName}
          </span>

          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.userName}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.isAdmin && (
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
    </Navbar>
  );
}
