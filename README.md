# 🎌 AniTracker

Diario personal de anime — busca series, ve sus detalles y lleva el control de tus capítulos.

## Stack
React 18 + Vite · React Router v6 · Context API · CSS Modules · Jikan API

## Cómo ejecutar

```bash
npm install
npm run dev
```

Crea un `.env` en la raíz (ver `.env.example`):
```
VITE_LOGIN_USERNAME=Aday
VITE_LOGIN_PASSWORD=tuPassword
```

---

## Progreso por días

### Día 1 — Setup, routing y navbar
- Login falso con ruta protegida (`/login`)
- `AuthContext` con sessionStorage y variables de entorno
- `ProtectedRoute` — redirige si no estás autenticado
- Navbar con efecto cristal degradado y menú hamburguesa
- Páginas placeholder para todas las rutas
- Tema visual: blanco + lavanda + azul

### Día 2 — *próximo*
### Día 3 — *próximo*
### Día 4 — *próximo*
### Día 5 — *próximo*

---

## Uso de IA

Usé Claude (Anthropic) como apoyo durante el desarrollo:

- **Planificación** — estructurar el proyecto en 5 días cubriendo todos los requisitos
- **Código base** — AuthContext, ProtectedRoute, LoginPage y App.jsx con rutas anidadas
- **Debug** — errores de dependencias, estilos que no se aplicaban, menú móvil roto
- **CSS** — tema de colores, efecto cristal en navbar, formulario de login

Las decisiones de diseño, la temática, los poderes del login y la detección de problemas las tomé yo. La IA aceleró la implementación y ayudó a depurar errores visuales.