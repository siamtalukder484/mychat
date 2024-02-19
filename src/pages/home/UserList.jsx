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
  const [fRequest, setfRequest] = useState([])
  const [friendList, setfriendList] = useState([])


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
    set(push(ref(db, "friendrequest/" +frequestinfo.id)),{
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
        if(item.val().senderid == data.uid){
          arr.push(item.val().receiverid + item.val().senderid)
        }
      })
      setfRequest(arr)
    });
  },[])

  //friend data
  useEffect(()=>{
    const friendsRef = ref(db, 'friends');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(item.val().whoreceiveid == data.uid || item.val().whosendid == data.uid){
          arr.push(item.val().whoreceiveid + item.val().whosendid)
        }
      })
      setfriendList(arr)
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
                    {
                      fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                      ?<>
                        <button className='addbutton'>pending</button>
                        <button onClick={()=>handleCancle(item)} className='addbutton'>cancel</button>
                      </>
                      :
                      friendList.includes(item.id + data.uid) || friendList.includes(data.uid + item.id)
                        ?
                        <button className='addbutton'>friend</button>
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