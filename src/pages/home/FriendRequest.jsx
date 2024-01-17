import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'

const FriendRequest = () => {
  return (
    <>
         <GroupCard cardtitle="Friend Request">
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
                    accept
                  </button>
                </div>
            </div>
          </div>
      </GroupCard>
    </>
  )
}

export default FriendRequest