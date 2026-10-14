import { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function Header({ title = 'Instagram' }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <Text style={[styles.title, title === 'Instagram' && styles.logo]}>{title}</Text>
      <View style={styles.userBox}>
        <Text style={styles.username}>@{user.username}</Text>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: '700' },
  logo: { fontSize: 26, fontStyle: 'italic', fontFamily: 'serif' },
  userBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  username: { color: '#555', fontSize: 13 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
});
