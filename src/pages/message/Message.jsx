import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import "./message.css"
import { useSelector,useDispatch } from 'react-redux';
import Image from '../../utilities/Image';
import { activeuser } from '../../slices/activeUserSlice';
// import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

const Message = () => {
  const [allmessage, setAllMessage] = useState([])
  const [msgtext, setMsgText] = useState("")
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const activechat = useSelector((state) => state?.activeuserdata?.value)
  const dispatch = useDispatch()

  //friend read operation
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

  let handleUser = (i) =>{
    dispatch(activeuser(i))
  }
  
  //msg write operation
  let handleSubmit = () => {
    set(push(ref(db, "message")),{
      senderid: data.uid,
      senderemail: data.email,
      sendername: data.displayName,
      message: msgtext,
      receiverid: data.uid == activechat.whoreceiveid ? activechat.whosendid : activechat.whoreceiveid,
      receivername: data.uid == activechat.whoreceiveid ? activechat.whosendname : activechat.whoreceivename,
      receiveremail: data.uid == activechat.whoreceiveid ? activechat.whosendemail : activechat.whoreceiveemail,
    }).then(()=>{
      console.log("msg send hoice");
    })
    
  }
  // msg read operation
  useEffect(()=>{
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
          if(data.uid == item.val().receiverid || data.uid == item.val().senderid){
            arr.push({...item.val(),id:item.key})
          }
      })
      setAllMessage(arr)
    });
  },[activechat])

  return (
    <div className='msg_wrapper'>
      <div className='msg_user_body'>
        <h3 className='list_heading'>Friend List</h3>
        <div className='msg_user_wrapper'>
            {friendList && friendList.length>0 ? 
              friendList.map((item,index)=>(
                // <div key={index} className="msg_user_item"></div>
                <div onClick={()=>handleUser(item)} key={index} className='msg_user_item'>
                    <div className='userimgbox'>
                      <Image source={data.uid == item.whosendid ? item.whoreceivephoto : item.whosendphoto} alt="img"/>
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
                      {/* <button className='addbutton'>
                          Message
                      </button> */}
                    </div>
                </div>
              ))
            :
            <h3>amar kono bondu ny</h3>
            }
        </div>
      </div>
      {activechat != null ?
      <div className='msg_box_body'>
          <div className="msg_box_heading">
            <h2>
              {activechat !== null &&
                activechat.whosendid == data.uid
                ?
                activechat.whoreceivename
                :
                activechat.whosendname
              }
            </h2>
            <p>Active Now</p>
          </div>
          <div className='msg_main'>
            {allmessage.map((item,index)=>(
                <div className="sendmsg">
                  <p>{item.message}</p>
                </div>
            ))

            }
              
              {/* <div className="receivemsg">
                <p>hello</p>
              </div>
              <div className="sendmsg">
                <p>I love you</p>
              </div>
              <div className="receivemsg">
                <p>I love you too</p>
              </div> */}
          </div>
          <div className='msg_footer'>

            <input onChange={(e)=>setMsgText(e.target.value)} placeholder='Please Enter your msg' className='msg_input'/>
            <button onClick={handleSubmit} className='msg_send_btn'>Send</button>
          </div>
      </div>
      :
      <div>
        <h1>Please select a user</h1>
      </div>
      }
    </div>
  )
}

export default Message