import { useState, createContext, useEffect, useContext } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Slide
} from '@chakra-ui/react'

const Notification = ({ message, type = 'success', onClose }) => {
  if (!message) {
    return null
  }

  const getGradientColors = () => {
    const gradients = {
      success: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      error: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)', 
      warning: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
      info: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)'
    }
    return gradients[type] || gradients.success
  }

  const getBorderColor = () => {
    const colors = {
      success: '#68d391',
      error: '#fc8181',
      warning: '#f6ad55',
      info: '#63b3ed'
    }
    return colors[type] || colors.success
  }

  return (
    <Slide direction="up" in={!!message} style={{ zIndex: 1000 }}>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={1000}
        maxWidth="400px"
        minWidth="300px"
      >
        <Alert
          status={type}
          variant="solid"
          borderRadius="12px"
          boxShadow="0 10px 25px rgba(0,0,0,0.15)"
          padding="16px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          background={getGradientColors()}
          border="1px solid"
          borderColor={getBorderColor()}
          backdropFilter="blur(10px)"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          }}
          transition="all 0.3s ease"
        >
          <Box display="flex" alignItems="center" flex="1">
            <AlertIcon boxSize="20px" mr="12px" />
            <AlertTitle 
              fontSize="14px" 
              fontWeight="600"
              color="white"
              lineHeight="1.4"
              textAlign="left"
            >
              {message}
            </AlertTitle>
          </Box>
          
          <CloseButton
            size="sm"
            onClick={onClose}
            color="white"
            _hover={{
              backgroundColor: 'whiteAlpha.200',
              transform: 'scale(1.1)'
            }}
            ml="12px"
            borderRadius="6px"
            transition="all 0.2s ease"
          />
        </Alert>
      </Box>
    </Slide>
  )
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: 'success',
    id: null
  })

  const showNotification = (message, type = 'success', duration = 5) => {
    const id = Date.now()
    setNotification({
      message,
      type,
      id
    })

    setTimeout(() => {
      setNotification(prev => prev.id === id ? { message: '', type: 'success', id: null } : prev)
    }, duration * 1000)
  }

  const hideNotification = () => {
    setNotification({ message: '', type: 'success', id: null })
  }

  // Auto-hide en caso de que el usuario no cierre manualmente
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        hideNotification()
      }, 10000) // 10 segundos máximo

      return () => clearTimeout(timer)
    }
  }, [notification.message])

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      <Notification 
        message={notification.message} 
        type={notification.type}
        onClose={hideNotification}
      />
      {children}
    </NotificationContext.Provider>
  )
}

// Hook personalizado para usar las notificaciones fácilmente
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider')
  }
  return context
}