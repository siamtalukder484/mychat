import { getAuth, signOut,updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Image from "../../utilities/Image";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { getAuth,updateProfile  } from "firebase/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../../slices/userSlice";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";

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
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loginuserdata.value);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

      // ===== Crop Image Start =====
      const [image, setImage] = useState();
      const [profile, setProfile] = useState("");
      const [cropData, setCropData] = useState("#");
      const [cropper, setCropper] = useState();
  
      const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
  
      const getCropData = () => {
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());
          const storage = getStorage();
          const storageRef = ref(storage, `profile_photo/${data.uid}`);
          const message4 = cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                // console.log('Uploaded a data_url string!');
                setOpen(false)
                setImage("")
                getDownloadURL(storageRef).then((downloadURL) => {
                  updateProfile(auth.currentUser, {
                    photoURL: downloadURL,
                  }).then(()=>{
                    dispatch(loginuser(auth.currentUser))
                    localStorage.setItem("user",JSON.stringify(auth.currentUser))
                  })
                });
          });       
        }
      };
      // ===== Crop Image End =====

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
            {/* <Image source={data && data.photoURL} alt="img" /> */}
            {image ? (
              <div className='img-preview'></div>
            ) : 
              data ? (
                  data.photoURL
                  ?
                  <Image source={data && data.photoURL} style='profile_img'/>
                  :
                  <Image source={data && data.photoURL} style='profile_img'/>
                ) : (
                  <Image source={data && data.photoURL} style='profile_img'/>
                  
              )
            }
          </div>
          <div>
            <input style={{textAlign:"center"}} onChange={onChange} type='file'/>
              {image &&
                <>
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />
                <button className='cropper_btn' onClick={getCropData}>Upload</button>
                </>
              }
          </div>
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
              {data 
                ? 
                  data.photoURL
                  ?
                  <Image source={data.photoURL} style='profile_img'/>
                  :
                  <Image source="assets/images/profile_avatar.png" style='profile_img'/>
                :
                <Image source="assets/images/profile_avatar.png" style='profile_img'/>
                }
            {/* <Image source={auth.currentUser && auth.currentUser.photoURL} alt="img" /> */}
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
