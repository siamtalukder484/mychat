import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import { TiPlus } from 'react-icons/ti'
import Image from '../../utilities/Image'

const UserList = () => {
  return (
    <>
        <GroupCard cardtitle="User List">
          <div className='usermainbox'>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
            <div className='useritem'>
                <div className='userimgbox'>
                  <Image source="" alt="img"/>
                </div>
                <div className='userinfobox'>
                  <div>
                      <h3>anik</h3>
                      <p>MERN Developer</p>
                  </div>
                  <button className='addbutton'>
                    <TiPlus />
                  </button>
                </div>
            </div>
          </div>
      </GroupCard>
    </>
  )
}

export default UserList