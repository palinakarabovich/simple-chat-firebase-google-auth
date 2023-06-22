import styles from './Message.module.css'

const Message = ({ message, user, similarName }) => {

  const myMessage = message.uid === user.uid ? true : false;

  return (
    <div className={styles.wrapper} style={myMessage ? { alignSelf: 'flex-end'} : { alignSelf: 'flex-start' }}> 
    {
      !similarName && <p className={styles.name} style={myMessage ? {} : {textAlign: 'left'}}>{message.displayName}</p>
    }
      <div className={styles.message} style={myMessage ? {backgroundColor: 'transparent', border: '1px solid  rgba(195, 195, 195, .2)' } : {}}>
        {
          myMessage ?
            (
              <div className={styles.container}>
                <p className={styles.text}>{message.text}</p>
                <img className={styles.avatar} src={message.photoURL} alt={`${message.displayName} ${message.text}`} />
              </div>
            )
            :
            (
              <div className={styles.container}>
                <img className={styles.avatar} src={message.photoURL} alt={message.displayName} />
                <p className={styles.text}>{message.text}</p>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default Message;