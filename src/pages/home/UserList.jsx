import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import GroupCard from '../../components/home/GroupCard';
import Image from '../../utilities/Image';

const UserList = () => {
  const [userList, setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest, setfRequest] = useState(undefined)


  // all users data
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
      })
      setUserList(arr)
    });
  },[])
  // console.log(userList);

  //add friend operation
  let handleFRequest = (frequestinfo) => {
    set(push(ref(db, "friendrequest")),{
      senderid: data.uid,
      sendername: data.displayName,
      senderimg: data.photoURL,
      senderemail: data.email,
      receiverid: frequestinfo.id,
      receivername: frequestinfo.username,
      receiveremail: frequestinfo.email,
      receiverimg: frequestinfo.profileimg
    }).then(()=>{
      toast("Friend Request Send Successfully..")
    })
  }


  //friend request data
  useEffect(()=>{
    const fRequestRef = ref(db, 'friendrequest');
    onValue(fRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().senderid){
          arr.push(item.val().senderid + item.val().receiverid)
        }
      })
      setfRequest(arr)
    });
  },[])


  let handleCancle = (i) => {
    console.log(i.id);
  }

  return (
    <>
        <ToastContainer/>
        <GroupCard cardtitle="User List">
          <div className='usermainbox'>
            {userList && userList.length > 0 
            ?
            userList.map((item,index)=>(
              <div key={index} className='useritem'>
                  <div className='userimgbox'>
                    <Image source={item.profileimg} alt="img"/>
                  </div>
                  <div className='userinfobox'>
                    <div>
                        <h3>{item.username}</h3>
                        <p>MERN Developer</p>
                    </div>
                    {fRequest &&
                      fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                      ?
                      <button onClick={()=>handleCancle(item)} className='addbutton'>cancel</button>
                      :
                      <button onClick={()=>handleFRequest(item)} className='addbutton'>
                        add
                      </button>
                      }
                  </div>
              </div>
            ))
            :
            <h2>No user available</h2>
            }
          </div>
      </GroupCard>
    </>
  )
}

export default UserList