import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  const { isLiked, isSaved, toggleLike, toggleSave, addComment } = useContext(PostsContext);
  const [draft, setDraft] = useState('');

  const liked = isLiked(post.id);
  const saved = isSaved(post.id);

  const sendComment = () => {
    addComment(post.id, user.username, draft);
    setDraft('');
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image source={{ uri: post.authorAvatar }} style={styles.avatar} />
        <Text style={styles.bold}>{post.author}</Text>
      </View>

      <Pressable onLongPress={() => toggleLike(post.id)} delayLongPress={250}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </Pressable>

      <View style={styles.actions}>
        <View style={styles.row}>
          <Pressable onPress={() => toggleLike(post.id)} hitSlop={8}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={28} color={liked ? '#ed4956' : '#262626'} />
          </Pressable>
          <Ionicons name="chatbubble-outline" size={25} color="#262626" />
          <Ionicons name="paper-plane-outline" size={25} color="#262626" />
        </View>
        <Pressable onPress={() => toggleSave(post.id)} hitSlop={8}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={26} color="#262626" />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.bold}>{post.likes} Me gusta</Text>
        <Text>
          <Text style={styles.bold}>{post.author} </Text>
          {post.caption}
        </Text>
        {post.comments.map((c) => (
          <Text key={c.id}>
            <Text style={styles.bold}>{c.author} </Text>
            {c.text}
          </Text>
        ))}
        <View style={styles.commentRow}>
          <Image source={{ uri: user.avatar }} style={styles.smallAvatar} />
          <TextInput
            style={styles.input}
            placeholder={`Comentar como ${user.username}...`}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={sendComment}
            returnKeyType="send"
          />
          {draft.trim() !== '' && (
            <Pressable onPress={sendComment}>
              <Text style={styles.publish}>Publicar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginBottom: 12 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
  avatar: { width: 34, height: 34, borderRadius: 17 },
  smallAvatar: { width: 24, height: 24, borderRadius: 12 },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#eee' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  body: { paddingHorizontal: 12, gap: 4 },
  bold: { fontWeight: '700' },
  commentRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  input: { flex: 1, paddingVertical: 4, color: '#262626' },
  publish: { color: '#0095f6', fontWeight: '700' },
});
