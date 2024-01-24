import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import Image from '../../utilities/Image';
import { getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import { getAuth } from "firebase/auth";

const Sidebar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    let handleLogout = () => {
        signOut(auth).then(()=>{
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
    console.log(userinfo.displayName);
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
                    <Image source={userinfo && userinfo.photoURL} alt="img"/>
                </div>
                <h3 className='username'>{userinfo && userinfo.displayName}</h3>
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