import React from 'react'

const LargeImageModal = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
        <div className="max-w-[90%] max-h-[90%]">
            <img src={imageUrl} alt="" className="w-full h-full" />
            <button className="absolute top-0 right-0 m-4 text-white bg-red-600 py-3 px-5 rounded-md" onClick={onClose}>
                Orqaga
            </button>
        </div>
    </div>
);

export default LargeImageModal