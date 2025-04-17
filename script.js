document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
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
    
    // Carrito interactivo
    const iconoCarrito = document.querySelector('.icono-carrito');
    const carrito = document.querySelector('.carrito');
    const iconoCarritoHover = document.querySelector('.icono-carrito.salta-al-hover');
    
    iconoCarrito.addEventListener('click', function() {
      carrito.style.right = '0';
      iconoCarritoHover.style.display = 'none';
    });
    
    iconoCarritoHover.addEventListener('click', function() {
      carrito.style.right = '-350px';
      this.style.display = 'none';
    });
    
    carrito.addEventListener('mouseleave', function() {
      iconoCarritoHover.style.display = 'block';
    });
    
    // Añadir items al carrito (simulación)
    const addButtons = document.querySelectorAll('.add-btn');
    
    addButtons.forEach(button => {
      button.addEventListener('click', function() {
        const item = this.closest('.menu-item');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = item.querySelector('.price').textContent;
        
        // Simulación de añadir al carrito
        alert(`Se añadió ${itemName} (${itemPrice}) al carrito`);
      });
    });
  });