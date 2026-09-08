import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({fullName, width, heigth, style}) => {
  return <div className={`${width || 'w-12'} ${heigth || 'h-12'} ${style || "" } flex items-center justify-center rounded-full text-text-fade font-medium`}>
    {getInitials(fullName || "")}
  </div>
}

export default CharAvatar