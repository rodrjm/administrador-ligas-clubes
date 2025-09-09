import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/ligas', label: 'Ligas', icon: '🏆' },
    { path: '/partidos', label: 'Partidos', icon: '⚽' },
    { path: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation - Bottom Tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive(item.path)
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation - Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">Ligas & Clubes</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">Ligas & Clubes</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Search</span>
            🔍
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Notifications</span>
            🔔
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex md:ml-64 md:items-center md:justify-between md:h-16 md:px-6 bg-white border-b border-gray-200">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar Ligas, Clubes o Partidos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Notifications</span>
            🔔
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              👤
            </div>
            <span className="text-sm font-medium text-gray-700">Usuario</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;
