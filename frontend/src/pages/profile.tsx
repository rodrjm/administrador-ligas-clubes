const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Usuario</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">usuario@ejemplo.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <p className="text-gray-900">Administrador de Liga</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h2>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium text-gray-900">Notificaciones</div>
            <div className="text-sm text-gray-600">Gestionar notificaciones de partidos</div>
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium text-gray-900">Privacidad</div>
            <div className="text-sm text-gray-600">Configurar privacidad de perfil</div>
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium text-gray-900">Cerrar Sesión</div>
            <div className="text-sm text-gray-600">Salir de la aplicación</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
