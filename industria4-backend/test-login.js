const axios = require('axios');

// Datos del usuario de prueba
const loginData = {
  email: 'miguel@ingeniaprojects.com',
  password: '1234'
};

// Función para hacer la solicitud POST
async function testLogin() {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un estado diferente de 2xx
      console.error('Error en la respuesta:', error.response.data);
    } else if (error.request) {
      // La solicitud se envió pero no se recibió respuesta
      console.error('Error en la solicitud, no se recibió respuesta:', error.request);
    } else {
      // Otro tipo de error
      console.error('Error al hacer la solicitud:', error.message);
    }
  }
}

// Llamar a la función de prueba
testLogin();
