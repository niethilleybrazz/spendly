import { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        
        if (file) { 
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl); 
        }
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input 
                type="file" 
                accept="image/*" 
                ref={inputRef} 
                onChange={handleImageChange} 
                className="hidden"
            />
            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-contrast rounded-full relative">
                    <LuUser className="text-4xl text-text"/>
                    <button 
                        type="button" 
                        className="w-8 h-8 flex items-center justify-center bg-text text-contrast rounded-full absolute -bottom-1 -right-1" 
                        onClick={onChooseFile}
                    >
                        <LuUpload/>
                    </button>
                </div>  
            ) : (
                <div className="relative">
                    <img src={previewUrl} alt="Foto de Perfil" className="w-20 h-20 rounded-full object-cover" />
                    <button 
                        type="button" 
                        className="w-8 h-8 flex items-center justify-center bg-text text-error rounded-full absolute -bottom-1 -right-1" 
                        onClick={handleRemoveImage}
                    >
                        <LuTrash/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;