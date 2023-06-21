import React from "react";
import { FirebaseContex } from "../../contex/contex";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './Chat.module.css'
import { Button, TextField, Container, Grid, Avatar } from "@mui/material";
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';

const Chat = () => {

  const { auth, db } = React.useContext(FirebaseContex);
  const [user] = useAuthState(auth);
  const [value, setValue] = React.useState('');
  const chatRef = React.useRef();
  const [messages, setMessages] = React.useState([]);

  const q = query(collection(db, "messages"), orderBy("createdAt"));

  React.useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesCollection = [];
      querySnapshot.forEach((doc) => {
        messagesCollection.push(doc.data());
      });
      setMessages(messagesCollection);
      if (chatRef.current) {
        chatRef.current.scrollIntoView();
      }
    });
    return () => {
      unsubscribe()
    }
  }, [])

  const sendMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });
      setValue('')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleEnterClick = (e) => {
    if(e.key === 'Enter' && value !== ''){
      sendMessage();
    }
  }


  return (
    <Container>
      <Grid container
        justify={"center"}
        style={{ height: window.innerHeight - 50, marginTop: 20 }}>
        <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
          {messages.length && messages.map(message =>
            <div style={{
              margin: 10,
              border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
              marginLeft: user.uid === message.uid ? 'auto' : '10px',
              width: 'fit-content',
              padding: 5,
            }}>
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          )}
          <div ref={chatRef}></div>
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: '80%' }}
        >
          <TextField
            fullWidth
            rowsmax={2}
            variant={"outlined"}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleEnterClick}
          />
          <Button onClick={sendMessage} variant={"outlined"}>Отправить</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat;

