import  { useContext } from 'react'
import { UserContext } from '../../../Context/UserProvider'

export const useUserContext = () =>  useContext(UserContext)
 
