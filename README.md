# Clon Móvil de Instagram con React Context

TP de EFSI: **React Context para manejar el estado global en una app con varias pantallas**.
Hecho en **React Native + Expo** sobre el Trabajo Práctico Clon Móvil de Instagram.

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escaneá el QR con **Expo Go** (Android/iOS) o apretá `w` para abrirlo en el navegador.

**Usuarios de prueba:** `nacho` / `1234` o `demo` / `demo`.

## Pantallas

| Pantalla | Qué hace |
|---|---|
| Login | Inicia sesión con usuario y contraseña. |
| Feed | Lista de publicaciones. Se puede dar like (ícono o mantener apretada la foto), guardar y comentar. |
| Guardados | Muestra solo las publicaciones que guardó el usuario. |
| Perfil | Datos del usuario, contadores de likes y guardados, edición de la bio, grilla de guardados y botón de cerrar sesión. |

---

## Uso de React Context

La app tiene **dos Contexts**, cada uno con una responsabilidad distinta.

### 1. Información compartida

**`AuthContext`: sesión del usuario**
- `user`: usuario logueado (`username`, `name`, `bio`, `avatar`).
- `isLoggedIn`: booleano que indica si hay sesión iniciada.
- `login(username, password)`, `logout()`, `updateBio(bio)`: acciones para modificar la sesión.

**`PostsContext`: publicaciones e interacciones del usuario**
- `posts`: lista de publicaciones, con contador de likes y comentarios.
- `savedPosts`, `savedCount`, `likedCount`: datos derivados de lo que el usuario likeó o guardó.
- `isLiked(id)`, `isSaved(id)`: consultan el estado de cada publicación.
- `toggleLike(id)`, `toggleSave(id)`, `addComment(id, autor, texto)`, `resetInteractions()`: acciones.

### 2. Archivos donde se crean los Contexts (`createContext`)

| Context | Archivo |
|---|---|
| `AuthContext` | [`src/context/AuthContext.js`](src/context/AuthContext.js) |
| `PostsContext` | [`src/context/PostsContext.js`](src/context/PostsContext.js) |

En cada archivo están el `createContext(...)` y el componente Provider (`AuthProvider` / `PostsProvider`) que guarda el estado con `useState`.

### 3. Componente donde se ubica el Provider

Los dos Providers envuelven toda la app en el componente raíz **`App`** ([`App.js`](App.js)):

```jsx
<SafeAreaProvider>
  <AuthProvider>
    <PostsProvider>
      <SafeAreaView>
        <Main />   {/* Login o pantallas + TabBar */}
      </SafeAreaView>
    </PostsProvider>
  </AuthProvider>
</SafeAreaProvider>
```

### 4. Componentes que consumen el Context con `useContext`

| Componente | Archivo | `AuthContext` | `PostsContext` |
|---|---|---|---|
| `Main` | `App.js` | `isLoggedIn`: muestra el Login o la app | |
| `LoginScreen` | `src/screens/LoginScreen.js` | `login` | |
| `Header` | `src/components/Header.js` | `user` (username y avatar) | |
| `TabBar` | `src/components/TabBar.js` | `user.avatar` (pestaña Perfil) | `savedCount` (badge) |
| `PostCard` | `src/components/PostCard.js` | `user` (autor del comentario) | `isLiked`, `isSaved`, `toggleLike`, `toggleSave`, `addComment` |
| `FeedScreen` | `src/screens/FeedScreen.js` | | `posts` |
| `SavedScreen` | `src/screens/SavedScreen.js` | | `savedPosts` |
| `ProfileScreen` | `src/screens/ProfileScreen.js` | `user`, `logout`, `updateBio` | `savedPosts`, `likedCount`, `savedCount`, `resetInteractions` |

### 5. Por qué conviene usar Context en este caso

- **Los datos se usan en muchos componentes que no son padre e hijo.** El usuario logueado aparece en el `Header`, en el `TabBar`, en el campo de comentario de cada `PostCard` y en el `Perfil`. Sin Context, `App` tendría que pasar `user` por props a cada pantalla y de ahí a cada componente, aunque algunos niveles intermedios (por ejemplo `FeedScreen` o `FlatList`) no lo usen. Eso es *prop drilling*.
- **El estado tiene que estar sincronizado entre pantallas.** Si se guarda una publicación en el Feed, tiene que aparecer al instante en **Guardados**, en la grilla del **Perfil**, en el contador de guardados y en el badge del **TabBar**. Si se edita la bio en el Perfil, se actualiza en todos lados. Como los datos viven en un solo lugar (el Provider), todas las pantallas leen la misma fuente y se vuelven a renderizar solas cuando cambia.
- **El estado no se pierde al cambiar de pestaña.** Las pantallas se montan y desmontan al navegar. Si los likes o guardados estuvieran en un `useState` dentro de `FeedScreen`, se perderían al pasar a otra pestaña. Al estar en el Provider, que queda montado arriba de todo, se conservan.
- **Cada cosa en su lugar.** La lógica de sesión (`AuthContext`) y la de publicaciones (`PostsContext`) están separadas de la interfaz. Los componentes solo llaman a `toggleLike(id)` o `logout()` sin saber cómo se guarda el estado. Además, el acceso a toda la app depende del Context: `Main` muestra el Login o el resto según `isLoggedIn`, y al cerrar sesión se limpian las interacciones.

## Estructura

```
App.js                      ← Providers + navegación por pestañas
src/
├── context/
│   ├── AuthContext.js      ← createContext + AuthProvider
│   └── PostsContext.js     ← createContext + PostsProvider
├── components/
│   ├── Header.js
│   ├── PostCard.js
│   └── TabBar.js
├── screens/
│   ├── LoginScreen.js
│   ├── FeedScreen.js
│   ├── SavedScreen.js
│   └── ProfileScreen.js
└── data/
    └── posts.js            ← datos de ejemplo (usuarios y publicaciones)
```
