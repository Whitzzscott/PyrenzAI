import React from "react";

interface RequiredFieldsPopupProps {
  missingFields: string[];
  onClose: () => void;
}

export default function RequiredFieldsPopup({
  missingFields,
  onClose,
}: RequiredFieldsPopupProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-labelledby="missingFieldsTitle"
      aria-describedby="missingFieldsList"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-8 rounded-xl shadow-xl text-white flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
      >
        <h2
          id="missingFieldsTitle"
          className="text-xl font-bold mb-6 text-center"
        >
          Missing Required Fields
        </h2>
        <ul
          id="missingFieldsList"
          className="list-disc list-inside mb-6 flex-grow space-y-3"
        >
          {missingFields.map((field, index) => (
            <li key={index} className="animate-slide-in text-lg">
              {field}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
