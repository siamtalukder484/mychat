import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Image from "../../utilities/Image";
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { getAuth } from "firebase/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../../slices/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Sidebar = () => {
  const data = useSelector((state) => state.loginuserdata.value);
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // const defaultSrc =
  // "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
  // const [image, setImage] = useState();
  // const [cropData, setCropData] = useState("#");


  // const onChange = (e) => {
  //   e.preventDefault();
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);
  // };

  // const getCropData = () => {
  //   if (typeof cropperRef.current?.cropper !== "undefined") {
  //     setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
  //   }
  // };

  // let handleImage = (e) => {
  //   console.log(e);
  // }

  useEffect(() => {
    if (!data) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, []);

  let handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      dispatch(loginuser(null));
      navigate("/");
      toast.success("Logout Done", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  };

  const userinfo = auth.currentUser;
  

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Upload Profile Photo</h2>
          <div className="img_holder">
            <Image source={data && data.photoURL} alt="img" />
          </div>
          <input type="file" />
        </Box>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="sidebarBox">
        <div>
          <div className="img_box">
            <Image source={data && data.photoURL} alt="img" />
            <div onClick={handleOpen} className="overlay">
              <FaCloudUploadAlt />
            </div>
          </div>
          <h3 className="username">{data && data.displayName}</h3>
          <p>{data && data.email}</p>
        </div>
        <div>
          <ul className="navigation">
            <li>
              <NavLink to="/home">
                <IoHomeOutline />
              </NavLink>
            </li>
            <li>
              <NavLink to="/message">
                <AiOutlineMessage />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notification">
                <IoIosNotificationsOutline />
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <CiSettings />
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
