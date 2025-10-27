function Header({ title, subtitle }) {
  return (
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
        )}
      </div>
  );
}

export default Header;

