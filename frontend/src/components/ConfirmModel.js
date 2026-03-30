import React from 'react'
import { X } from 'lucide-react'

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-200"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold mb-4 dark:text-white">Confirmation</h2>
        <p className="mb-6 dark:text-white">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:text-white" >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:scale-105 transition" >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}