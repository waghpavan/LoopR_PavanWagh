import { useNavigate } from "react-router-dom";
import wallet from "../wallet.png";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="h-16 flex rounded-lg justify-between items-center px-8 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg border-b border-blue-900">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <img className="w-10 h-10" src={wallet} alt="logo" />
        <span className="text-2xl font-bold text-white font-sans tracking-wide">
          FIN-TRACE
        </span>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/transactions")}
          className="px-4 py-1.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition duration-200 shadow"
        >
          Transactions
        </button>
        <button
          onClick={() => navigate("/Dash")}
          className="px-4 py-1.5 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-300 transition duration-200 shadow"
        >
          Analytics
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition duration-200 shadow"
        >
          Logout
        </button>

        {/* User avatar */}
        <div className="rounded-full h-10 w-10 bg-blue-100 flex items-center justify-center ml-3 border border-blue-300 shadow-inner">
          <span className="text-red-600 font-bold text-lg">
            {localStorage.getItem("username")
              ? localStorage.getItem("username")[0]?.toUpperCase()
              : "U"}
          </span>
        </div>
      </div>
    </div>
  );
};
