import { useContext } from 'react'
import { NotificationsContext } from './NotificationsProvider'

export default function useNotifications() {
  return useContext(NotificationsContext)
}
