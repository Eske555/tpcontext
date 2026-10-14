import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { PostsContext } from '../context/PostsContext';

export default function SavedScreen() {
  const { savedPosts } = useContext(PostsContext);

  return (
    <View style={styles.container}>
      <Header title="Guardados" />
      <FlatList
        data={savedPosts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={savedPosts.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={56} color="#262626" />
            <Text style={styles.emptyTitle}>Todavía no guardaste nada</Text>
            <Text style={styles.emptyText}>Tocá el ícono de guardar en una publicación del feed.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', padding: 32, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyText: { color: '#8e8e8e', textAlign: 'center' },
});
