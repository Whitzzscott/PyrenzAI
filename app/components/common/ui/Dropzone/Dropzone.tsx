import { useDropzone, Accept } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[], isAvatar: boolean) => void;
  avatarImagePreview: string | null;
  bannerImagePreview: string | null;
  label?: string;
  className: string;
}

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
    style={{ width: "2rem", height: "2rem" }}
  >
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
  </svg>
);

export default function Dropzone({
  onDrop,
  avatarImagePreview,
  bannerImagePreview,
  label = "Drag & drop a file here or click to upload",
  className,
}: DropzoneProps) {
  const handleDrop = async (acceptedFiles: File[], isAvatar: boolean) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        if (isAvatar) {
          sessionStorage.setItem("Character_Create_Image_Profile", base64data);
        } else {
          sessionStorage.setItem("Character_Create_Image_Banner", base64data);
        }
      };

      reader.readAsDataURL(file);
    }
    onDrop(acceptedFiles, isAvatar);
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
    isDragActive: isBannerDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, false),
    accept: {
      "image/*": [".jpeg", ".png", ".gif"],
    } as Accept,
    multiple: false,
  });

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
    isDragActive: isAvatarDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, true),
    accept: {
      "image/*": [".jpeg", ".png", ".gif"],
    } as Accept,
    multiple: false,
  });

  return (
    <div className="relative">
      <div
        {...getBannerRootProps()}
        className={`relative flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isBannerDragActive ? "bg-gray-700" : "bg-gray-800"
        } ${bannerImagePreview ? "border-none" : "border-dashed border-2 border-gray-500"} ${className} rounded-lg`}
        style={{ height: "200px", width: "auto" }}
      >
        <input {...getBannerInputProps()} />
        {bannerImagePreview ? (
          <img
            src={bannerImagePreview}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <UserIcon />
            <p className="text-white mt-2">{label}</p>
          </>
        )}
      </div>

      <div
        {...getAvatarRootProps()}
        className={`absolute bottom-0 left-0 flex items-center justify-center cursor-pointer transition-colors ${
          isAvatarDragActive ? "bg-gray-700" : "bg-gray-800"
        } ${avatarImagePreview ? "border-none" : "border-dashed border-2 border-gray-500"} rounded-full`}
        style={{ height: "80px", width: "80px", transform: "translateY(50%)" }}
      >
        <input {...getAvatarInputProps()} />
        {avatarImagePreview ? (
          <img
            src={avatarImagePreview}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <UserIcon />
        )}
      </div>
    </div>
  );
}
