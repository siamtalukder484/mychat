import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set,push,remove } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';

const FriendRequest = () => {

  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest, setfRequest] = useState()


  useEffect(()=>{
    const fRequestRef = ref(db, 'friendrequest');
    onValue(fRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        console.log(item.val());
        if(data.uid == item.val().receiverid){
          arr.push({...item.val(),id:item.key})
        }
      })
      setfRequest(arr)
    });
  },[])
  
 let handleCancelFRequest = (cancelinfo) => {
    console.log(cancelinfo);
    remove(ref(db, "friendrequest/" + cancelinfo.id)).then(()=>{
      toast("Request Cancel..")
    })
    
 }

  return (
    <>
        <ToastContainer/>
         <GroupCard cardtitle="Friend Request">
          <div className='usermainbox'>
            {fRequest && fRequest.length > 0 ?
            fRequest.map((item,index)=>(
              <div key={index} className='useritem'>
                  <div className='userimgbox'>
                    <Image source={item.senderimg} alt="img"/>
                  </div>
                  <div className='userinfobox'>
                    <div>
                        <h3>{item.sendername}</h3>
                        <p>MERN Developer</p>
                    </div>
                    <div className='buttongroup'>
                      <button className='addbutton'>
                        accept
                      </button>
                      <button onClick={()=>handleCancelFRequest(item)} className='addbutton'>
                        cancel
                      </button>
                    </div>
                  </div>
              </div>
            ))
            :
            <h2>No Request Found ....</h2>
            }
          </div>
      </GroupCard>
    </>
  )
}

export default FriendRequest