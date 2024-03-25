import React, { useEffect, useState, useRef } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import "./message.css"
import { useSelector,useDispatch } from 'react-redux';
import Image from '../../utilities/Image';
import { activeuser } from '../../slices/activeUserSlice';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
// import { css } from 'emotion';
// import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";


// const ROOT_CSS = css({
//   height: 600,
//   width: 400
// });

const Message = () => {
  const [allmessage, setAllMessage] = useState([])
  const [msgtext, setMsgText] = useState("")
  const [showemoji, setShowEmoji] = useState(false)
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const activechat = useSelector((state) => state?.activeuserdata?.value)
  const dispatch = useDispatch()
  const emojiRef = useRef()

  // console.log(activechat);

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
      setMsgText("")
    })
    
  }
  // msg read operation
  useEffect(()=>{
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      let arr = []
      let activeuserid = activechat.whosendid == data.uid ? activechat.whoreceiveid : activechat.whosendid
      console.log(activeuserid);
      snapshot.forEach((item)=>{
          if((item.val().senderid == data.uid && item.val().receiverid == activeuserid) || (item.val().receiverid == data.uid && item.val().senderid == activeuserid ) ){
              arr.push({...item.val(),id:item.key})
          }
      })
      setAllMessage(arr)
    });
  },[activechat])

  let handleKeyPress = (e) => {
    // console.log(e.key);
    if(e.key == "Enter"){
      set(push(ref(db, "message")),{
        senderid: data.uid,
        senderemail: data.email,
        sendername: data.displayName,
        message: msgtext,
        receiverid: data.uid == activechat.whoreceiveid ? activechat.whosendid : activechat.whoreceiveid,
        receivername: data.uid == activechat.whoreceiveid ? activechat.whosendname : activechat.whoreceivename,
        receiveremail: data.uid == activechat.whoreceiveid ? activechat.whosendemail : activechat.whoreceiveemail,
      }).then(()=>{
        setMsgText("")
      })
    }
  }

  let handleEmojiPick = (e) => {
    setMsgText(msgtext + e.emoji);
  }

  useEffect(()=>{
    document.body.addEventListener("click",(e)=>{

      // console.log(e.target);
      // console.log(emojiRef.current.contains(e.target));
      if(emojiRef.current.contains(e.target)){
        setShowEmoji(true)
      }else{
        setShowEmoji(false)
      }
    })
  },[])
  

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
          <ScrollToBottom className="scrollbox">
            <div className='msg_main'>
              {allmessage.map((item,index)=>(
                  <div key={index} className={`${item.receiverid == data.uid ? "receivemsg" : "sendmsg"}`}>
                    <p>{item.message}</p>
                  </div>
              ))

              }
            </div>
          </ScrollToBottom>
          <div className='msg_footer'>

            <input onKeyUp={handleKeyPress} onChange={(e)=>setMsgText(e.target.value)} value={msgtext} placeholder='Please Enter your msg' className='msg_input'/>
            {msgtext.length > 0 &&
              <button onClick={handleSubmit} className='msg_send_btn'>Send</button>
            }
            
              <div ref={emojiRef} >
                {showemoji ?
                  <button onClick={()=>setShowEmoji(false)} className='msg_send_btn'>un Emoji</button>
                  :
                  <button onClick={()=>setShowEmoji(!showemoji)} className='msg_send_btn'>Emoji</button>
                }
                {showemoji &&
                  <div className='emoji_wrapper'>
                    <EmojiPicker onEmojiClick={handleEmojiPick} />
                  </div>
                }
              </div>
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