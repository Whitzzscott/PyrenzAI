import { useEffect, useState, useRef } from "react";

interface CosmeticProps {
  onBackgroundChange: (imageUrl: string | null) => void;
}

export default function Cosmetic({ onBackgroundChange }: CosmeticProps) {
  const [charColor, setCharColor] = useState<string>("green");
  const [tempColor, setTempColor] = useState<string>("green");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [tempBgImage, setTempBgImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedColor = localStorage.getItem("charColor");
    const savedBgImage = localStorage.getItem("bgImage");

    if (savedColor) {
      setCharColor(savedColor);
      setTempColor(savedColor);
    }
    if (savedBgImage) {
      setBgImage(savedBgImage);
      setTempBgImage(savedBgImage);
      onBackgroundChange(savedBgImage);
    }
  }, [onBackgroundChange]);

  const handleSave = () => {
    setCharColor(tempColor);
    setBgImage(tempBgImage);
    localStorage.setItem("charColor", tempColor);

    if (tempBgImage) {
      localStorage.setItem("bgImage", tempBgImage);
      onBackgroundChange(tempBgImage);
    } else {
      localStorage.removeItem("bgImage");
      onBackgroundChange(null);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setTempBgImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setTempBgImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setTempBgImage(null);
    setBgImage(null);
    localStorage.removeItem("bgImage");
    onBackgroundChange(null);
  };

  return (
    <div className="mt-4 p-4 bg-gray-700 rounded-md">
      <h3 className="text-lg font-semibold">Customization</h3>

      <div className="mt-3">
        <label className="block font-medium">Character Text Color</label>
        <input
          type="color"
          value={tempColor}
          onChange={(e) => setTempColor(e.target.value)}
          className="mt-2 w-full h-10 cursor-pointer border border-gray-500 rounded-md"
        />
      </div>

      <p className="mt-3">
        Preview:{" "}
        <span style={{ color: tempColor, fontWeight: "bold" }}>
          Character's Text
        </span>
      </p>

      <div className="mt-3">
        <p className="text-gray-300">Change Background</p>
        <div
          className={`w-full h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer relative ${
            dragging ? "border-blue-500 bg-gray-600" : "border-gray-500"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {tempBgImage ? (
            <>
              <img
                src={tempBgImage}
                alt="Background Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                &times;
              </button>
            </>
          ) : (
            <p className="text-gray-300">Click or Drag & Drop an image here</p>
          )}
        </div>
        <button
          onClick={handleDeleteImage}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Remove Image
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition"
      >
        Save Changes
      </button>
    </div>
  );
}
