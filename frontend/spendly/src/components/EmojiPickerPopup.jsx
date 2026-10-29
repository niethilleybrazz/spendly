import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={()=> setIsOpen(true)}
        >
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-contrast text-text rounded-lg">
                {icon? (
                    <img src={icon} alt="Ícone" className='w-12 h-12' />
                ):(
                    <LuImage/>
                )}
            </div>
            <p className="text-text">
                {icon ? "Mudar ícone" : "Escolha um ícone"}
            </p>
        </div>

        {isOpen && (
            <div className="relative">
                <button 
                    className="w-7 h-7 flex items-center justify-center bg-white border border-borders rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                    onClick={()=> setIsOpen(false)}    
                >
                    <LuX/>
                </button>

                <EmojiPicker
                    open={isOpen}
                    onEmojiClick={(emoji)=> onSelect(emoji?.imageUrl || "")}
                />
            </div>
        )}
    </div>


  )
}

export default EmojiPickerPopup