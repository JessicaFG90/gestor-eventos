# 🗓️ Gestor de Eventos — Proyecto Final Lenguaje de Marcas

Proyecto final de **HTML, CSS y JavaScript** desarrollado en el módulo de **Lenguaje de Marcas** (1º DAM · Curso 2025/2026).

---

## 📋 Descripción

Aplicación web de tipo **SPA (Single Page Application)** para gestionar eventos personales. Toda la interfaz se construye dinámicamente desde JavaScript partiendo de un único `<div id="app">` en el HTML. No se recarga la página en ningún momento.

El diseño aplica **glassmorphism** con una paleta de colores pastel cálidos y es totalmente responsive.

---

## ✨ Funcionalidades

- **Crear eventos** con título, descripción, fecha y categoría
- **Marcar/desmarcar favoritos** con cambio visual de la tarjeta
- **Eliminar eventos** con animación de salida suave
- **Buscar en tiempo real** por texto en el título
- **Filtrar por categoría** (Trabajo, Personal, Ocio, Salud)
- **Contador de eventos** que se actualiza automáticamente
- **Notificaciones flotantes** (toast) para cada acción del usuario
- **Validación de formulario** con mensajes de error por campo
- **Diseño responsive** que se adapta a móvil

---

## 💡 Conceptos aplicados (los 12 apartados del proyecto)

| Apartado | Concepto |
|---|---|
| 1 | Creación dinámica del DOM desde JavaScript |
| 2 | Selección de elementos con `querySelector` |
| 3 | Manipulación de contenido, clases y estilos |
| 4 | Creación de eventos mediante formulario |
| 5 | Gestión de eventos del usuario (`click`, `submit`, `input`) |
| 6 | Delegación de eventos sobre el contenedor padre |
| 7 | Navegación por jerarquía del DOM (`closest`, `querySelector`) |
| 8 | Atributos personalizados `data-*` (categoría, estado favorito) |
| 9 | Eliminación y modificación de elementos |
| 10 | Búsqueda y filtrado en tiempo real |
| 11 | Validación de formularios con JavaScript |
| 12 | Mejora de UX (animaciones, notificaciones, hover effects) |

---

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ▶️ Cómo ejecutarlo

No requiere instalación ni dependencias. Abre directamente en el navegador:

```
index.html   →   Abrir con Live Server (VS Code) o doble clic
```

---

## 📁 Estructura del proyecto

```
📄 index.html      ← Único contenedor HTML (solo <div id="app">)
📄 estilo.css      ← Todos los estilos, glassmorphism y responsive
📄 app.js          ← Toda la lógica: DOM dinámico, eventos, filtros
```

---

## 🎨 Diseño

- Fondo degradado pastel (melocotón → amarillo → rosa)
- Efecto **glassmorphism** en el formulario y las tarjetas
- Animaciones CSS en hover, clic de botones y eliminación de tarjetas
- Notificaciones con animación de entrada/salida
- Paleta de colores: rosa frambuesa, amarillo mantequilla, melocotón

---

## 🎓 Contexto académico

> Proyecto Final de la asignatura **Lenguaje de Marcas** · 1º DAM · 2025/2026
