import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-blue-100 text-sm flex justify-center">
      <div>{label}</div>
      <Link
        className="pl-1 text-red-400 underline hover:text-red-300 transition duration-150"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
