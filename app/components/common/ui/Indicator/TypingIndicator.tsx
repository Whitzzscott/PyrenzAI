export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            animation: `bounce 1.5s ease-in-out ${i * 0.2}s infinite`,
            backgroundColor: "white",
          }}
        />
      ))}
    </div>
  );
}
