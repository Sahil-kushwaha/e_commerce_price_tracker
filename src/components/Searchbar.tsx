'use client'

import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url:string)=>{
     try{
         const parsedURL = new URL(url);
         const hostname = parsedURL.hostname;
         if(
          hostname.includes('amazon.com') ||
          hostname.includes('amazon.')||
          hostname.includes('amazon')
         )
         return true;
     }
     catch(error)
     {
         return false;
     }
   return false;  
}

function Searchbar() {

     const [ItemLink ,setItemLink] = useState("")
     const [isLoading ,setIsLoading] = useState(false)

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
         e.preventDefault();
         const isValidLink = isValidAmazonProductURL(ItemLink)
        
        if(!isValidLink) return alert("please provide a valid Amazon link")
        
        try{
            setIsLoading(true);

            // scrape the page
        } catch(error){
            console.error(error)
        }
        finally{
          setIsLoading(false)
        }
    }



  return (
    <form className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleSubmit}
    >

       <input type="text" 
        name="search" 
        value={ItemLink}
        placeholder='Enter product link'
        onChange={(e)=>(setItemLink(e.target.value))}
        className='searchbar-input shadow-xs'
        />

        <button type='submit' 
        disabled={ItemLink==='' ||isLoading}
        className='searchbar-btn'>
           {isLoading? 'searching...':'Search'}
        </button>
        
    </form>
  )
}

export default Searchbar