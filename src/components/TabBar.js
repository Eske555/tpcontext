import { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';

export default function TabBar({ current, onChange }) {
  const { user } = useContext(AuthContext);
  const { savedCount } = useContext(PostsContext);

  return (
    <View style={styles.bar}>
      <Pressable style={styles.tab} onPress={() => onChange('feed')}>
        <Ionicons name={current === 'feed' ? 'home' : 'home-outline'} size={26} color="#262626" />
      </Pressable>

      <Pressable style={styles.tab} onPress={() => onChange('saved')}>
        <Ionicons name={current === 'saved' ? 'bookmark' : 'bookmark-outline'} size={25} color="#262626" />
        {savedCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{savedCount}</Text>
          </View>
        )}
      </Pressable>

      <Pressable style={styles.tab} onPress={() => onChange('profile')}>
        <Image
          source={{ uri: user.avatar }}
          style={[styles.avatar, current === 'profile' && styles.avatarActive]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  avatar: { width: 28, height: 28, borderRadius: 14 },
  avatarActive: { borderWidth: 2, borderColor: '#262626' },
  badge: {
    position: 'absolute',
    top: 4,
    right: '32%',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ed4956',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
