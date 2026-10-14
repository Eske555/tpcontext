import { createContext, useState } from 'react';
import { INITIAL_POSTS } from '../data/posts';

// 1. Se crea el Context con createContext.
export const PostsContext = createContext(null);

// 2. Provider: guarda los posts y qué posts likeó / guardó el usuario.
export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [likedIds, setLikedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  const toggleLike = (postId) => {
    const isLiked = likedIds.includes(postId);
    setLikedIds((prev) => (isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p))
    );
  };

  const toggleSave = (postId) => {
    setSavedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const addComment = (postId, author, text) => {
    if (!text.trim()) return;
    const comment = { id: String(Date.now()), author, text: text.trim() };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
    );
  };

  // Al cerrar sesión se limpian las interacciones del usuario.
  const resetInteractions = () => {
    setPosts(INITIAL_POSTS);
    setLikedIds([]);
    setSavedIds([]);
  };

  const value = {
    posts,
    savedPosts: posts.filter((p) => savedIds.includes(p.id)),
    isLiked: (postId) => likedIds.includes(postId),
    isSaved: (postId) => savedIds.includes(postId),
    likedCount: likedIds.length,
    savedCount: savedIds.length,
    toggleLike,
    toggleSave,
    addComment,
    resetInteractions,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

