import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 flex justify-around items-center text-white w-full'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img src="icons/love.svg " alt="love" /> by Rahul.
            </div>
        </div>
    )
}

export default Footer
