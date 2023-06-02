import { useCallback, useMemo, useState } from "react"
import { string } from "yup"

export const useLocalstorage = () => {
     const [value, setValue] = useState(null)
     const setItem =  useCallback(async (key , value ) => {
      if(typeof value !== string){
         await localStorage.setItem(key ,JSON.stringify(value))
      }else{
         await localStorage.setItem(key ,value)
      }
       
        setValue(value)
     },[])
     const getItem = useCallback( async (key) => {
        const value = await JSON.parse(localStorage.getItem(key))
        
        setValue(value)
        return value
     },[])
     const removeItem = useCallback( async (key) => {
         await localStorage.removeItem(key)
     },[])

     const memorizedValue = useMemo(() => ({
          value,
          setItem,
          getItem,
          removeItem
     }),[value,setItem,getItem,removeItem])

     return memorizedValue
}
