import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import GroupCard from '../../components/home/GroupCard';
import Image from '../../utilities/Image';

const FriendRequest = () => {

  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest, setfRequest] = useState()


  useEffect(()=>{
    const fRequestRef = ref(db, 'friendrequest');
    onValue(fRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().receiverid){
          arr.push({...item.val(),id:item.key})
        }
      })
      setfRequest(arr)
    });
  },[])
  
 let handleCancelFRequest = (cancelinfo) => {
    remove(ref(db, "friendrequest/" + cancelinfo.id)).then(()=>{
      toast("Request Cancel..")
    })
 }

 let handleAcceptFRequest = (acceptinfo) => {
  console.log(acceptinfo);
  set(push(ref(db, "friends")),{
    whosendname: acceptinfo.sendername,
    whosendid: acceptinfo.senderid,
    whosendemail: acceptinfo.senderemail,
    whosendphoto: acceptinfo.senderimg,
    whoreceivename: data.displayName,
    whoreceiveid: data.uid,
    whoreceiveemail: data.email,
    whoreceivephoto: data.photoURL
  }).then(()=>{
    remove(ref(db, "friendrequest/" + acceptinfo.id))
    toast("Request accepted Successfully..")
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
                      <button onClick={()=>handleAcceptFRequest(item)} className='addbutton'>
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