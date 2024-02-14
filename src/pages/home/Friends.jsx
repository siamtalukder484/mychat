import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GroupCard from '../../components/home/GroupCard';
import Image from "../../utilities/Image";

const Friends = () => {
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
          if(data.uid == item.val().whoreceiveid || data.uid == item.val().whosendid){
            arr.push({...item.val(),id:item.key})
          }
      })
      setFriendList(arr)
    });
  },[])

  console.log(friendList);

  return (
    <>
        <GroupCard cardtitle="Friend">
          <div className='usermainbox'>
            {friendList && friendList.length > 0 ? friendList.map((item,index)=>(
                <div key={index} className='useritem'>
                    <div className='userimgbox'>
                      <Image source={item.whosendphoto} alt="img"/>
                    </div>
                    <div className='userinfobox'>
                    <div>
                        {data.uid == item.whosendid 
                          ?
                          <h3>{item.whoreceivename}</h3>
                          :
                          <h3>{item.whosendname}</h3>
                        }
                        <p>MERN Developer</p>
                    </div>
                    <button className='addbutton'>
                        Block
                    </button>
                    </div>
                </div>
            ))
            :
            <h1>no friend available..</h1>
            }
          </div>
      </GroupCard>
    </>
  )
}

export default Friends