import React, { SyntheticEvent } from "react";
import { FirebaseContex } from "../../contex/contex";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './Chat.module.css'
import { Button, TextField, Grid } from "@mui/material";
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import Message from "../Message/Message";
import { v4 as uuidv4 } from 'uuid';
import MessageSkeleton from "../Skeleton/Skeleton";
import { messageValues } from "../../types/types";

const Chat = () => {

  const { auth, db } = React.useContext(FirebaseContex);
  const [user] = useAuthState(auth);
  const [value, setValue] = React.useState<string>('');
  const chatRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<Array<messageValues>>([]);

  const q = query(collection(db, "messages"), orderBy("createdAt"));

  React.useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesCollection: Array<messageValues> = [];
      querySnapshot.forEach((doc) => {
        messagesCollection.push(doc.data() as messageValues);
      });
      setMessages(messagesCollection);
    });
    return () => {
      unsubscribe()
    }
  }, [])

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
    }
  }, [messages])

  const sendMessage = async () => {
    if(user){
      try {
        const docRef = await addDoc(collection(db, "messages"), {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          text: value,
          createdAt: serverTimestamp(),
          id: uuidv4()
        } as messageValues);
        setValue('');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  const handleEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && value !== '') {
      sendMessage();
    }
  }

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      className={styles.chat}
      style={{ width: "80%" }}>
      <div className={styles.chat__box} >
        {messages.length > 0 ?
          (messages.map((message, index) => {
            if(index === 0){
              return <Message message={message} user={user} key={message.id} similarName={false} />
            }
            else {
              const previousName = message.displayName === messages[index - 1].displayName ? true : false;
              return <Message message={message} user={user} key={message.id} similarName={previousName} />
            }
          }))
          :
          [...new Array(8)].map((_, index) => <div className={styles.skeleton} key={index} style={index % 2 === 0 ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }}><MessageSkeleton /></div>)
        }
        <div ref={chatRef}></div>
      </div>
      <Grid
        container
        direction={"row"}
        className={styles.chat__input}
      >
        <TextField
          className={styles.chat__inputArea}
          variant={"outlined"}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleEnterClick}
        />
        <Button
          onClick={sendMessage}
          variant={"outlined"}
          className={styles.chat__inputButton}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  )
}

export default Chat;

