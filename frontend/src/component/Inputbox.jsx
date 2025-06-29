export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm text-blue-800 font-medium text-left py-2">
        {label}
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md border-blue-300 bg-white text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
      />
    </div>
  );
}
