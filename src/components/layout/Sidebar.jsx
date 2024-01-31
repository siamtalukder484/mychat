import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Image from '../../utilities/Image';
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from "../../slices/userSlice";

const Sidebar = () => {
    const data = useSelector((state) => state.loginuserdata.value)
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!data){
            navigate("/")
        }
        else{
            navigate("/home")
        }
    },[])


    let handleLogout = () => {
        signOut(auth).then(()=>{
            localStorage.removeItem("user")
            dispatch(loginuser(null))
            navigate("/")
            toast.success('Logout Done', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

    const userinfo = auth.currentUser;
    // console.log(userinfo.displayName);

  return (
    <>
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
        <div className='sidebarBox'>
            <div>
                <div className='img_box'>
                    <Image source={data && data.photoURL} alt="img"/>
                </div>
                <h3 className='username'>{data && data.displayName}</h3>
                <p>{data && data.email}</p>
            </div>
            <div>
                <ul className='navigation'>
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
                <button onClick={handleLogout} className='logout'>Logout</button>
            </div>
        </div>
    </>
  )
}

export default Sidebar