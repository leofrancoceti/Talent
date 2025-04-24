document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil este es gabbys para poder ver y selleccionar el menú
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
  
  // Ruleta de emociones
  const emociones = document.querySelectorAll('.emocion');
  const resultadoElement = document.getElementById('resultado');
  const ruletaAnimacion = document.getElementById('ruleta-animacion');
  const btnReiniciar = document.getElementById('reiniciar-ruleta');
  
  // Recomendaciones basadas en emociones
  const recomendaciones = {
    feliz: [
      "¡Celebra con un McFlurry Oreo!",
      "Una Cajita Feliz para mantener esa alegría",
      "Prueba nuestro nuevo Menú Deluxe",
      "Comparte unas papas grandes con amigos"
    ],
    triste: [
      "Un McFlurry de chocolate para animarte",
      "Nuestras papas fritas más grandes para consolarte",
      "Una hamburguesa con queso para mejorar tu día",
      "Un batido de vainilla para endulzar tu ánimo"
    ],
    estresado: [
      "Un café caliente y un muffin para relajarte",
      "10 McNuggets para liberar tensiones",
      "Un batido frío para calmarte",
      "Una ensalada fresca para despejar tu mente"
    ],
    hambriento: [
      "¡Doble Cuarto de Libra con queso!",
      "Big Mac con papas grandes y refresco",
      "McNífica Doble para saciar tu hambre",
      "Combo familiar para los más hambrientos"
    ],
    aburrido: [
      "Prueba algo nuevo: McRib",
      "Combina diferentes sabores con una selección de McNuggets",
      "Gira nuestra ruleta otra vez para más emoción",
      "Crea tu propia hamburguesa con ingredientes especiales"
    ]
  };
  
  emociones.forEach(emocion => {
    emocion.addEventListener('click', function() {
      // Resetear selección
      emociones.forEach(e => e.classList.remove('seleccionada'));
      
      // Seleccionar esta emoción
      this.classList.add('seleccionada');
      
      // Mostrar animación
      ruletaAnimacion.style.display = 'block';
      resultadoElement.textContent = '';
      
      // Ocultar botón de reinicio
      btnReiniciar.style.display = 'none';
      
      // Simular proceso de "pensar"
      setTimeout(() => {
        const emocionSeleccionada = this.dataset.emocion;
        const opciones = recomendaciones[emocionSeleccionada];
        const randomIndex = Math.floor(Math.random() * opciones.length);
        const recomendacion = opciones[randomIndex];
        
        // Detener animación y mostrar resultado
        ruletaAnimacion.style.display = 'none';
        resultadoElement.textContent = recomendacion;
        
        // Mostrar botón de reinicio
        btnReiniciar.style.display = 'inline-block';
      }, 1500);
    });
  });
  
  // Reiniciar ruleta
  btnReiniciar.addEventListener('click', function() {
    emociones.forEach(e => e.classList.remove('seleccionada'));
    resultadoElement.textContent = '';
    this.style.display = 'none';
  });
  
  // Filtro por categoría
  window.filtrarCategoria = function(categoria) {
    const categorias = ['hamburguesas', 'papas', 'postres', 'bebidas'];
    categorias.forEach(cat => {
      const elementos = document.querySelectorAll('.' + cat);
      elementos.forEach(el => {
        el.style.display = (categoria === 'todas' || categoria === cat) ? 'flex' : 'none';
      });
    });
    
    // Scroll suave a la sección de menú
    if(categoria !== 'todas') {
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Funcionalidad de Voz
  const vozMic = document.getElementById('voz-mic');
  const vozTexto = document.getElementById('voz-texto');
  const vozIniciar = document.getElementById('voz-iniciar');
  const vozDetener = document.getElementById('voz-detener');
  const vozBorrar = document.getElementById('voz-borrar');
  
  let reconocimiento;
  let grabando = false;
	let conversacion = [];
  
  // Verificar compatibilidad con el API de reconocimiento de voz
  if ('webkitSpeechRecognition' in window) {
    reconocimiento = new webkitSpeechRecognition();
    reconocimiento.continuous = true;
    reconocimiento.interimResults = true;
    reconocimiento.lang = 'es-ES';
    
    reconocimiento.onstart = function() {
      grabando = true;
      vozMic.classList.add('grabando');
      vozTexto.textContent = "Escuchando... habla ahora";
      vozIniciar.disabled = true;
      vozDetener.disabled = false;
    };
    
    reconocimiento.onerror = function(event) {
      console.error('Error en reconocimiento de voz:', event.error);
      vozTexto.textContent = "Error: " + event.error;
      detenerGrabacion();
    };
    
    reconocimiento.onend = function() {
      if (grabando) {
        reconocimiento.start(); // Reiniciar si aún está en modo grabación
      }
    };
    
    reconocimiento.onresult = function(event) {
      let textoTranscrito = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          textoTranscrito += event.results[i][0].transcript;
        } else {
          textoTranscrito += event.results[i][0].transcript;
        }
      }
      vozTexto.textContent = textoTranscrito;
      procesarComando(textoTranscrito);
    };
    
    vozIniciar.addEventListener('click', function() {
      reconocimiento.start();
    });
    
    vozDetener.addEventListener('click', detenerGrabacion);
    
    vozBorrar.addEventListener('click', function() {
      vozTexto.textContent = "Presiona el micrófono y habla...";
    });
    
    vozMic.addEventListener('click', function() {
      if (grabando) {
        detenerGrabacion();
      } else {
        reconocimiento.start();
      }
    });
  } else {
    vozTexto.textContent = "Lo siento, tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.";
    vozIniciar.disabled = true;
    vozDetener.disabled = true;
  }
  
  function detenerGrabacion() {
    grabando = false;
    reconocimiento.stop();
    vozMic.classList.remove('grabando');
    vozIniciar.disabled = false;
    vozDetener.disabled = true;
  }
  
  async function procesarComando(texto) {
    // Logica de voz gabbys ya daada por el usauruio
    console.log("Comando recibido:", texto);
		conversacion.push('user': texto)
		await consultarOpenAI();
		
  }



  async function consultarOpenAI() {
    const tools = [{
    "type": "function",
    "name": "CompleteOrder",
    "description": "Realiza un pedido de comida en McDonald's",
    "parameters": {
        "type": "object",
        "properties": {
            "food": {
                "type": "string",
                "description": "Comida que deseas pedir"
            },
            "quantity": {
                "type": "integer",
                "description": "Cantidad de comida que deseas pedir"
            }
        },
        "required": [
            "food",
            "quantity"
        ],
        "additionalProperties": false
    }
}]
    
    const respuesta = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        input: [
{"role": "system", "content": "Eres un cajero  de McDonald's y debes ayudar a los clientes a realizar su pedido, 2-. Si el cliente no especifica la cantidad, asume que quiere 1 unidad de cada producto. 3-. Si el cliente no especifica el producto, pregunta por el nombre del producto que desea pedir. 4Ten en ceunta que el cliente tiene discapacidad Visual. "},
				 ...convesacion
				],
				tools: tools
      })
    });

    const datos = await respuesta.json();
		console.log(datos);
    console.log(datos.output[0].content[0].text);
conversacion.push({
	'agent': datos.output[0].content[0].text
});
    //generarAudio(datos.choices[0].message.content);
  }


});
