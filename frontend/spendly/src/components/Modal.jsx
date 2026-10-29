import React from 'react'
import { LuX } from "react-icons/lu";

const Modal = ({children, isOpen, onClose, title}) => {
    if(!isOpen) return null

  return <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/40 bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-background02 rounded-lg shadow-sm border border-borders">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-borders">
                    <h3 className=" text-lg font-medium text-text">
                        {title}
                    </h3>

                    <button
                        type='button'
                        className='text-text bg-transparent hover:bg-text-gray rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer'
                        onClick={onClose}
                    >
                        <LuX/>
                    </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    </div>
}

export default Modal