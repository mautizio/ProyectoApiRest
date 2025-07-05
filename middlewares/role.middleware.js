module.exports = (requiredRole) => (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        message: `Acceso denegado. Se requiere rol: ${requiredRole}` 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error en verificación de rol:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
  