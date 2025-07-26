import React from "react";

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-lg font-bold mb-4">Product yang dihapus akan hilang secara permanen. Apakah anda 
                    yakin ingin menghapus produk ini?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                        onClick={onCancel}
                    >
                        Batal
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Iya
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmModal;

