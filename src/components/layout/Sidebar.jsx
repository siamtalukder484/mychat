import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import Image from '../../utilities/Image';




const Sidebar = () => {
  return (
    <>
        <div className='sidebarBox'>
            <div>
                <div className='img_box'>
                    <Image source="" alt="img"/>
                </div>
                <h3 className='username'>Anik</h3>
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
                <button className='logout'>Logout</button>
            </div>
        </div>
    </>
  )
}

export default Sidebar