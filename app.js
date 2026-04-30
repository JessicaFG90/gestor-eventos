// ============================================================
// PUNTO DE ENTRADA — se ejecuta al cargar el script
// ============================================================
iniciarApp();

function iniciarApp() {
    const app = document.getElementById('app');

    // --- Encabezado ---
    const header = document.createElement('header');
    header.classList.add('encabezado');

    const titulo = document.createElement('h1');
    titulo.textContent = 'Gestor de Eventos';
    titulo.classList.add('titulo-app');
    header.appendChild(titulo);

    // --- Layout principal: dos columnas (formulario | eventos) ---
    const main = document.createElement('main');
    main.classList.add('contenido-principal');

    // Panel izquierdo: formulario de nuevo evento
    const panelForm = document.createElement('section');
    panelForm.classList.add('panel-formulario');

    const tituloForm = document.createElement('h2');
    tituloForm.textContent = 'Nuevo evento';
    panelForm.appendChild(tituloForm);
    panelForm.appendChild(crearFormulario());

    // Panel derecho: buscador, contador y lista de tarjetas
    const panelEventos = document.createElement('section');
    panelEventos.classList.add('panel-eventos');
    panelEventos.appendChild(crearBarraBusqueda());

    const contador = document.createElement('p');
    contador.id = 'contador-eventos';
    contador.classList.add('contador-eventos');
    contador.textContent = 'No hay eventos todavía';
    panelEventos.appendChild(contador);

    // Contenedor donde se insertarán las tarjetas de eventos
    const contenedor = document.createElement('div');
    contenedor.id = 'contenedor-eventos';
    panelEventos.appendChild(contenedor);

    main.appendChild(panelForm);
    main.appendChild(panelEventos);
    app.appendChild(header);
    app.appendChild(main);

    // Activar delegación de eventos sobre el contenedor de tarjetas
    activarDelegacion();
}

// ============================================================
// FORMULARIO: construcción dinámica de todos sus campos
// ============================================================
function crearFormulario() {
    const form = document.createElement('form');
    form.id = 'form-evento';
    form.noValidate = true; // La validación la hacemos nosotros en validarFormulario()

    form.appendChild(crearCampo('Título *', 'input-titulo', 'text', 'Ej: Reunión'));
    form.appendChild(crearSpanError('error-titulo'));
    form.appendChild(crearCampoTextarea('Descripción', 'input-desc', 'Escribe aquí...'));
    form.appendChild(crearCampo('Fecha *', 'input-fecha', 'date', ''));
    form.appendChild(crearSpanError('error-fecha'));
    form.appendChild(crearSelectCategoria());

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Añadir Evento';
    btn.classList.add('btn-primario');
    form.appendChild(btn);

    // Al enviar el formulario se llama a manejarEnvio
    form.addEventListener('submit', manejarEnvio);

    return form;
}

// Crea un div con label + input genérico
function crearCampo(labelText, id, tipo, ph) {
    const w = document.createElement('div');
    const l = document.createElement('label');
    l.textContent = labelText;
    l.htmlFor = id;
    const i = document.createElement('input');
    i.type = tipo;
    i.id = id;
    i.placeholder = ph;
    w.appendChild(l);
    w.appendChild(i);
    return w;
}

// Crea un div con label + textarea
function crearCampoTextarea(lt, id, ph) {
    const w = document.createElement('div');
    const l = document.createElement('label');
    l.textContent = lt;
    l.htmlFor = id;
    const ta = document.createElement('textarea');
    ta.id = id;
    ta.placeholder = ph;
    ta.rows = 3;
    w.appendChild(l);
    w.appendChild(ta);
    return w;
}

// Crea el span rojo donde se muestran los mensajes de error del campo
function crearSpanError(id) {
    const s = document.createElement('span');
    s.classList.add('error-msg');
    s.id = id;
    return s;
}

// Crea el select de categorías con sus opciones
function crearSelectCategoria() {
    const w = document.createElement('div');

    const l = document.createElement('label');
    l.textContent = 'Categoría *';
    l.htmlFor = 'input-categoria';

    const sel = document.createElement('select');
    sel.id = 'input-categoria';

    ['Elige una categoría...', 'Trabajo', 'Personal', 'Ocio', 'Salud'].forEach((c) => {
        const o = document.createElement('option');
        o.value = c === 'Elige una categoría...' ? '' : c; // '' = no seleccionado
        o.textContent = c;
        sel.appendChild(o);
    });

    w.appendChild(l);
    w.appendChild(sel);
    return w;
}

// ============================================================
// ENVÍO DEL FORMULARIO
// ============================================================
function manejarEnvio(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar

    // Leer y limpiar los valores de cada campo
    const titulo      = document.getElementById('input-titulo').value.trim();
    const descripcion = document.getElementById('input-desc').value.trim();
    const fecha       = document.getElementById('input-fecha').value;
    const categoria   = document.getElementById('input-categoria').value;

    // Si la validación falla, detenemos la ejecución aquí
    if (!validarFormulario(titulo, fecha, categoria)) return;

    // Crear la tarjeta y añadirla al panel de eventos
    const tarjeta = crearTarjetaEvento({ titulo, descripcion, fecha, categoria });
    document.getElementById('contenedor-eventos').appendChild(tarjeta);
    actualizarContador();
    mostrarNotificacion('✅ Evento "' + titulo + '" creado', 'exito'); // Añade la notificación de que se ha creado un evento.
    event.target.reset(); // Limpia todos los campos del formulario
}

// ============================================================
// TARJETA DE EVENTO: construye el article con todos sus datos
// ============================================================
function crearTarjetaEvento(datos) {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta-evento');
    tarjeta.dataset.categoria = datos.categoria; // Usado por el filtro de categoría
    tarjeta.dataset.favorito  = 'false'; // Estado inicial: no es favorito

    const h3t = document.createElement('h3');
    h3t.classList.add('evento-titulo');
    h3t.textContent = datos.titulo;

    const pF = document.createElement('p');
    pF.classList.add('evento-fecha');
    const [anio, mes, dia] = datos.fecha.split('-'); // Formato YYYY-MM-DD
    pF.textContent = '📆 ' + dia + '/' + mes + '/' + anio; // Para formato DD/MM/YYYY

    const sC = document.createElement('span');
    sC.classList.add('evento-categoria');
    sC.textContent = datos.categoria || 'Sin categoría';

    const pD = document.createElement('p');
    pD.classList.add('evento-descripcion');
    pD.textContent = datos.descripcion || '(sin descripción)';

    // Botón para marcar/desmarcar como favorito
    const btnFav = document.createElement('button');
    btnFav.classList.add('btn-favorito');
    btnFav.textContent = 'Favorito';
    btnFav.dataset.accion = 'favorito'; // Identificador para la delegación

    // Botón para eliminar la tarjeta
    const btnElim = document.createElement('button');
    btnElim.classList.add('btn-eliminar');
    btnElim.textContent = 'Eliminar';
    btnElim.dataset.accion = 'eliminar'; // Identificador para la delegación

    tarjeta.appendChild(h3t);
    tarjeta.appendChild(pF);
    tarjeta.appendChild(sC);
    tarjeta.appendChild(pD);
    tarjeta.appendChild(btnFav);
    tarjeta.appendChild(btnElim);

    return tarjeta;
}

// ============================================================
// DELEGACIÓN DE EVENTOS
// Un solo listener en el contenedor padre gestiona todos los botones,
// incluso los de tarjetas creadas después de cargar la página.
// ============================================================
function activarDelegacion() {
    document.getElementById('contenedor-eventos').addEventListener('click', (event) => {
        const el = event.target;

        if (el.dataset.accion === 'eliminar') {
            const t = el.closest('.tarjeta-evento'); // Sube al article padre
            t.classList.add('desapareciendo'); // Dispara animación CSS
            setTimeout(() => {
                t.remove();
                actualizarContador();
                mostrarNotificacion('🗑️ Evento eliminado', 'eliminar');
            }, 300); // Espera a que termine la animación (300ms)
        }

        if (el.dataset.accion === 'favorito') {
            toggleFavorito(el.closest('.tarjeta-evento'), el);
        }
    });
}

// Alterna el estado favorito de una tarjeta: clase CSS + data-favorito + texto del botón
function toggleFavorito(tarjeta, boton) {
    const esFav = tarjeta.dataset.favorito === 'true'; // dataset devuelve siempre string
    tarjeta.dataset.favorito = esFav ? 'false' : 'true';
    tarjeta.classList.toggle('es-favorito', !esFav); // true = añadir, false = quitar
    boton.textContent = esFav ? 'Favorito' : 'Quitar favorito';

    const nombreEvento = tarjeta.querySelector('.evento-titulo').textContent;
    const msg = esFav ? '☆ "' + nombreEvento + '" quitado de favoritos' : '⭐ "' + nombreEvento + '" añadido a favoritos';
    mostrarNotificacion(msg, 'favorito');
}

// ============================================================
// VALIDACIÓN DE CAMPOS
// Devuelve true si todo es correcto, false si hay algún error.
// ============================================================
function validarFormulario(titulo, fecha, categoria) {
    let ok = true;

    // Limpiar errores previos antes de validar de nuevo
    document.getElementById('error-titulo').textContent = '';
    document.getElementById('error-fecha').textContent  = '';
    document.getElementById('input-titulo').classList.remove('input-error');

    if (titulo.length < 3) {
        document.getElementById('error-titulo').textContent = 'Mínimo 3 caracteres';
        document.getElementById('input-titulo').classList.add('input-error');
        ok = false;
    }

    if (!fecha) {
        document.getElementById('error-fecha').textContent = 'Fecha obligatoria';
        ok = false;
    }

    if (!categoria) {
        alert('Selecciona una categoría');
        ok = false;
    }

    return ok;
}

// ============================================================
// BARRA DE BÚSQUEDA Y FILTRO POR CATEGORÍA
// ============================================================
function crearBarraBusqueda() {
    const div = document.createElement('div');
    div.classList.add('barra-busqueda');

    // Input de texto: filtra en tiempo real con cada tecla
    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'input-busqueda';
    input.placeholder = 'Buscar...';
    input.addEventListener('input', () => filtrarPorTexto(input.value));

    // Select: filtra por categoría al cambiar la opción
    const sel = document.createElement('select');
    sel.id = 'filtro-categoria';
    ['Todas', 'Trabajo', 'Personal', 'Ocio', 'Salud'].forEach((c) => {
        const o = document.createElement('option');
        o.value = c === 'Todas' ? '' : c;
        o.textContent = c;
        sel.appendChild(o);
    });
    sel.addEventListener('change', () => filtrarPorCategoria(sel.value));

    div.appendChild(input);
    div.appendChild(sel);
    return div;
}

// Oculta las tarjetas cuyo título no contiene el texto buscado
function filtrarPorTexto(texto) {
    const t = texto.toLowerCase();
    document.querySelectorAll('.tarjeta-evento').forEach((tarjeta) => {
        const titulo = tarjeta.querySelector('.evento-titulo').textContent.toLowerCase();
        tarjeta.style.display = titulo.includes(t) ? '' : 'none';
    });
}

// Oculta las tarjetas que no pertenecen a la categoría seleccionada
function filtrarPorCategoria(cat) {
    document.querySelectorAll('.tarjeta-evento').forEach((tarjeta) => {
        tarjeta.style.display = (!cat || tarjeta.dataset.categoria === cat) ? '' : 'none';
    });
}

// ============================================================
// CONTADOR DE EVENTOS
// Se llama cada vez que se añade o elimina una tarjeta.
// ============================================================
function actualizarContador() {
    const total = document.querySelectorAll('.tarjeta-evento').length;
    const el = document.getElementById('contador-eventos');
    el.textContent = total === 0 ? 'No hay eventos todavía' : total === 1 ? '1 evento registrado' : total + ' eventos registrados';
}

// ============================================================
// NOTIFICACIÓN FLOTANTE
// Muestra un mensaje temporal en pantalla y lo oculta solo.
// ============================================================
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Busca si ya existe una notificación; si no, la crea
    let notif = document.getElementById('notificacion');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'notificacion';
        document.body.appendChild(notif);
    }

    // Asigna el mensaje y el tipo visual (exito, eliminar, favorito)
    notif.textContent = mensaje;
    notif.className = 'notificacion notificacion--' + tipo; // resetea clases anteriores

    // Fuerza reflow para que la animación de entrada se dispare aunque
    // la notificación ya estuviera visible de una llamada anterior
    void notif.offsetWidth;

    notif.classList.add('notificacion--visible');

    // Limpia el temporizador anterior si el usuario actúa muy rápido
    clearTimeout(notif._timer);
    notif._timer = setTimeout(() => {
        notif.classList.remove('notificacion--visible');
    }, 2800);
}