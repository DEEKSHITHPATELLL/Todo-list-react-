import React from 'react'
function Navbar(){
    return (
        <>
            <nav className='flex justify-between bg-slate-700 text-white py-2'>
                <div className="logo">
                    <span className='font-bold text-xl mx-9'>itask</span>

                </div>
                <ul className="flex gap-8 mx-9"></ul>
                <li className='cursor-pointer hover:font-bold transition-all duration-200'style={{
                    listStyle:"none",
                    textDecoration:"none"
                }}>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-200'style={{
                    listStyle:"none",
                    textDecoration:"none"
                }}>Your Tasks</li>
            </nav>
        </>
    )
}
export default Navbar;