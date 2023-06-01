import { useCallback, useMemo, useState } from "react"

export const useLocalstorage = () => {
     const [value, setValue] = useState(null)
     const setItem =  useCallback(async (key , value ) => {
        await localStorage.setItem(key ,value)
        setValue(value)
     },[])
     const getItem = useCallback( async (key) => {
        const value = JSON.parse(localStorage.getItem(key))
        setValue(value)
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
