import React from 'react'
import SearchInput from './SearchInput'
import NewButton from '../NewButton/NewButton'

const SearchContainer = () => {
  return (
    <div className='w-full flex justify-between items-center gap-4 mb-5 px-2'>
        <SearchInput/>
        <NewButton/>
    </div>
  )
}

export default SearchContainer