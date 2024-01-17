import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'

const BlockList = () => {
  return (
    <>
        <GroupCard cardtitle="Block List">
          <div className='usermainbox'>
            {[0,1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='useritem'>
                    <div className='userimgbox'>
                    <Image source="" alt="img"/>
                    </div>
                    <div className='userinfobox'>
                    <div>
                        <h3>anik</h3>
                        <p>MERN Developer</p>
                    </div>
                    <button className='addbutton'>
                        Unblock
                    </button>
                    </div>
                </div>
            ))
            }
          </div>
      </GroupCard>
    </>
  )
}

export default BlockList