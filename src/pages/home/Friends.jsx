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
          if(data.uid == item.val().whoreceiveid){
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
            {friendList && friendList.map((item,index)=>(
                <div key={index} className='useritem'>
                    <div className='userimgbox'>
                      <Image source={item.whosendphoto} alt="img"/>
                    </div>
                    <div className='userinfobox'>
                    <div>
                        <h3>{item.whosendname}</h3>
                        <p>MERN Developer</p>
                    </div>
                    <button className='addbutton'>
                        Block
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

export default Friends