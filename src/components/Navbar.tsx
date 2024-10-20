import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navIcons =[
  { src:"../../assets/icons/search.svg" , alt:"search" },
  { src:"../../assets/icons/black-heart.svg" , alt:"black-heart" },
  { src:"../../assets/icons/user.svg" , alt:"user" }
]
function Navbar() {
  return (
    <header className='w-full'>
         <nav className='nav'>
             <Link href={'/'} className='flex items-center gap-1'>
                 <Image
                   src="../../assets/icons/logo.svg" 
                   width={27}
                   height={27}
                   alt='logo'
                 />
                <p className='text-xl'>
                    Price<span className='text-primary'>Wise</span>
                </p>
             </Link>

            <div className='flex items-center gap-5'>
                {navIcons.map(img=>(
                     <Image 
                        key={img.alt}
                        src={img.src}
                        alt={img.alt}
                        width={28}
                        height={28}
                     />
                ))}
            </div> 
             
         </nav>
    </header>
  )
}

export default Navbar