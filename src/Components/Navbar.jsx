import React from 'react'

const Navbar = () => {
    return (
        <nav className=' flex bg-green-900 w-full overflow-hidden justify-between text-center items-center h-[45px] text-white '>
            <div className="font-bold mx-6 flex "><h1>"Pass King"</h1></div>
            <ul>
                <li className='flex text-sm md:text-sm   font-bold gap-3 mx-3'>
                    <a className='hover:text-[#232323]' href="/">Home</a>
                    <a className='hover:text-[#232323]' href="/">Passwords</a>
                    <a className='hover:text-[#232323]' href="/">Contact</a>
                    <a className='hover:text-[#232323]' href="/">FAQ</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar