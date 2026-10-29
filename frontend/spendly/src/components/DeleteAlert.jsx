import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className="text-sm text-text">{content}</p>

        <div className="flex justify-end mt-6">
            <button 
                type='button'
                className="add-btn add-btn-fill"
                onClick={onDelete}
            >
                Excluir
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert