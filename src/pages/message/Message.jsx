import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import "./message.css"
import { useSelector } from 'react-redux';
import Image from '../../utilities/Image';

const Message = () => {

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

  let handleUser = (i) =>{
    console.log(i);
  }

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
      <div className='msg_box_body'>
          <div className="msg_box_heading">
            <h2>Anik</h2>
            <p>Active Now</p>
          </div>
          <div className='msg_main'>
              <div className="sendmsg">
                <p>hello</p>
              </div>
              <div className="receivemsg">
                <p>hello</p>
              </div>
              <div className="sendmsg">
                <p>I love you</p>
              </div>
              <div className="receivemsg">
                <p>I love you too</p>
              </div>
          </div>
          <div className='msg_footer'>
            <input placeholder='Please Enter your msg'/>
          </div>
      </div>
    </div>
  )
}

export default Message