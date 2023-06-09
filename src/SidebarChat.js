import React, {useEffect, useState} from 'react';
import {Avatar} from '@mui/material';
import './SidebarChat.css';
import db from './firebase'; 
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function SidebarChat({ id , name, addNewChat}) {
    // const [seed, setSeed] = useState("");
    const [messages, setMessages]= useState("");
    const [{user} , dispatch] = useStateValue();
    useEffect(()=>{
      if(id){
        db.collection('room').doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot)=>
        setMessages(snapshot.docs.map((doc)=>
        doc.data()))
        );
      }
    }, [id]);

    // useEffect(()=>{
    //     setSeed(Math.floor(Math.random()*5000));
    // },[]);

    const createChat=()=>{
      const roomName = prompt('Please Enter your name for chat');

      if(roomName){
        // do something
        db.collection('room').add({
          name: roomName,
        });
      }
    };
  return !addNewChat ? (
    <Link to={`/room/${id}`}>
    <div className="sidebarChat">
      {/* <Avatar src={`https://api.dicebear.com/6.x/adventurer/svg?seed= ${seed}`}/> */}
      <Avatar src={user?.photoURL}/>
         <div className='sidebarChat_info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p> 
         </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
