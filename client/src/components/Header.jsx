import { useAuth } from '../context/AuthContext';

function Header({ title, subtitle }) {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  }

  return (
      <div className="px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
          )}
        </div>
        
        <button 
          className="border border-gray-200 text-sm rounded-md px-4 py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
  );
}

export default Header;

