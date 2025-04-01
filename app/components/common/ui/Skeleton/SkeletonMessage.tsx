import Mascot from "~/Assets/Images/MascotHappy.png";

export default function SkeletonMessage() {
  return (
    <div className="flex items-center justify-center h-screen animate-pulse">
      <div className="flex flex-col items-center justify-start">
        <img src={Mascot} alt="Mascot" className="w-32 h-32" />
        <span className="font-baloo text-lg mt-4">Loading Messages...</span>
      </div>
    </div>
  );
}
