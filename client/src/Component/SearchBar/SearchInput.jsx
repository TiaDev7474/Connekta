import React from 'react'
import search from '../../assets/searchbar.svg'
const SearchInput = () => {
  return (
       <label className=' flex bg-[#1E1E1E] rounded-full py-2 px-2 justify-start items-center ' >
            <input 
                  type='search'
                  name='q'
                  className='input placeholder:text-gray-100 px-6 text-white'
                  placeholder='Rechercher ..'
              />
            <button >
            <img 
                      src={search} 
                      alt='search icon ' 
                      width={40}
                      className='hover:bg-[#f3ecec2e] p-[6px] hover:opacity-80 rounded-full'
                  />
            </button>
       </label>
  )
}

export default SearchInput