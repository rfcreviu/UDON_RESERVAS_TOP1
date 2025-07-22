/**
 * Módulo de configuración segura para UDON Reservas
 * Maneja la carga y validación de variables de entorno
 */

require('dotenv').config();

class ConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

/**
 * Configuración del servidor
 */
const serverConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
};

/**
 * Configuración de email
 */
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.office365.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  
  // Configuración por restaurante
  restaurants: {
    alisios: {
      user: process.env.EMAIL_ALISIOS_USER,
      pass: process.env.EMAIL_ALISIOS_PASS
    },
    meridiano: {
      user: process.env.EMAIL_MERIDIANO_USER,
      pass: process.env.EMAIL_MERIDIANO_PASS
    },
    ruizalda: {
      user: process.env.EMAIL_RUIZALDA_USER,
      pass: process.env.EMAIL_RUIZALDA_PASS
    }
  }
};

/**
 * Validar configuración requerida
 */
function validateConfiguration() {
  const errors = [];

  // Validar configuración del servidor
  if (!serverConfig.jwtSecret) {
    errors.push('JWT_SECRET es requerido');
  }

  if (serverConfig.jwtSecret && serverConfig.jwtSecret.length < 32) {
    errors.push('JWT_SECRET debe tener al menos 32 caracteres');
  }

  // Validar configuración de email
  if (!emailConfig.host) {
    errors.push('EMAIL_HOST es requerido');
  }

  // Validar credenciales por restaurante
  Object.entries(emailConfig.restaurants).forEach(([restaurant, config]) => {
    if (!config.user) {
      errors.push(`EMAIL_${restaurant.toUpperCase()}_USER es requerido`);
    }
    
    if (!config.pass) {
      errors.push(`EMAIL_${restaurant.toUpperCase()}_PASS es requerido`);
    }
    
    // En producción, verificar que no sean valores por defecto
    if (serverConfig.isProduction && config.pass === 'CAMBIAR_EN_PRODUCCION') {
      errors.push(`EMAIL_${restaurant.toUpperCase()}_PASS debe cambiarse en producción`);
    }
  });

  if (errors.length > 0) {
    throw new ConfigurationError(`Errores de configuración:\n${errors.map(e => `- ${e}`).join('\n')}`);
  }
}

/**
 * Obtener configuración de email para un restaurante específico
 */
function getEmailConfigForRestaurant(restaurantId) {
  const config = emailConfig.restaurants[restaurantId];
  
  if (!config) {
    throw new ConfigurationError(`Configuración de email no encontrada para restaurante: ${restaurantId}`);
  }
  
  if (!config.user || !config.pass) {
    throw new ConfigurationError(`Credenciales de email incompletas para restaurante: ${restaurantId}`);
  }
  
  return {
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  };
}

/**
 * Mostrar configuración (sin credenciales sensibles)
 */
function showConfiguration() {
  console.log('📋 Configuración del sistema:');
  console.log(`   🌍 Entorno: ${serverConfig.nodeEnv}`);
  console.log(`   🚀 Puerto: ${serverConfig.port}`);
  console.log(`   📧 Servidor email: ${emailConfig.host}:${emailConfig.port}`);
  console.log(`   🔐 JWT configurado: ${serverConfig.jwtSecret ? '✅' : '❌'}`);
  
  console.log('   📬 Emails configurados:');
  Object.keys(emailConfig.restaurants).forEach(restaurant => {
    const config = emailConfig.restaurants[restaurant];
    const userConfigured = config.user ? '✅' : '❌';
    const passConfigured = config.pass && config.pass !== 'CAMBIAR_EN_PRODUCCION' ? '✅' : '❌';
    console.log(`      ${restaurant}: usuario ${userConfigured}, contraseña ${passConfigured}`);
  });
}

/**
 * Inicializar y validar configuración
 */
function initializeConfiguration() {
  try {
    console.log('🔧 Inicializando configuración...');
    
    // Validar configuración
    validateConfiguration();
    
    // Mostrar configuración (sin credenciales)
    showConfiguration();
    
    console.log('✅ Configuración válida y cargada correctamente');
    
    return true;
  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error('❌ Error de configuración:');
      console.error(error.message);
      
      if (serverConfig.isProduction) {
        console.error('\n💡 En producción, configura las variables de entorno en tu servidor.');
        console.error('📖 Consulta la documentación en docs/CONFIGURACION_PRODUCCION.md');
      } else {
        console.error('\n💡 En desarrollo, copia .env.example a .env y configura tus credenciales.');
      }
      
      return false;
    } else {
      console.error('❌ Error inesperado:', error.message);
      return false;
    }
  }
}

module.exports = {
  server: serverConfig,
  email: emailConfig,
  validateConfiguration,
  getEmailConfigForRestaurant,
  showConfiguration,
  initializeConfiguration,
  ConfigurationError
};
