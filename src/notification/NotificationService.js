import { useState, createContext } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

const Notification = ({ message }) => {
  if(!message) {
    return null
  }
    return (
      
    <Alert status='success' variant='solid'
    top='80px'
    right='0px'
    padding='10px'
    borderLeftRadius='1rem'
    position='absolute'
    textAlign='center'
    height='45px'
    width='300px'>
      <AlertIcon />
      <AlertTitle padding='10px'>
        {message}
      </AlertTitle>
    </Alert>
    )
  }
  

export const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
    const [message, setMessage] = useState('')
    
    const setNotification = (message, time) => {
        setMessage(message)
        
        setTimeout(() => {
          setMessage('')
        }, time * 1000)
      }
    

    return (
        <NotificationContext.Provider value={setNotification}>
            <Notification message={message}/>
            { children }
        </NotificationContext.Provider>
    )
} 