import { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { PostsContext } from '../context/PostsContext';

export default function FeedScreen() {
  const { posts } = useContext(PostsContext);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
});
