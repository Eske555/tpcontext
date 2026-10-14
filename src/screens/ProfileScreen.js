import { useContext, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';

export default function ProfileScreen() {
  const { user, logout, updateBio } = useContext(AuthContext);
  const { savedPosts, likedCount, savedCount, resetInteractions } = useContext(PostsContext);
  const [editing, setEditing] = useState(false);
  const [bioDraft, setBioDraft] = useState(user.bio);

  const saveBio = () => {
    updateBio(bioDraft.trim());
    setEditing(false);
  };

  const handleLogout = () => {
    resetInteractions();
    logout();
  };

  return (
    <View style={styles.container}>
      <Header title={user.username} />
      <View style={styles.info}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.stats}>
          <Stat value={likedCount} label="Me gusta" />
          <Stat value={savedCount} label="Guardados" />
        </View>
      </View>

      <View style={styles.bioBox}>
        <Text style={styles.name}>{user.name}</Text>
        {editing ? (
          <TextInput style={styles.bioInput} value={bioDraft} onChangeText={setBioDraft} autoFocus multiline />
        ) : (
          <Text>{user.bio}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={editing ? saveBio : () => setEditing(true)}>
          <Text style={styles.buttonText}>{editing ? 'Guardar' : 'Editar perfil'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logout]}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <FlatList
        data={savedPosts}
        keyExtractor={(p) => p.id}
        numColumns={3}
        renderItem={({ item }) => <Image source={{ uri: item.image }} style={styles.thumb} />}
        ListEmptyComponent={<Text style={styles.empty}>Tus publicaciones guardadas aparecen acá.</Text>}
      />
    </View>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  info: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 24 },
  avatar: { width: 86, height: 86, borderRadius: 43 },
  stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#262626' },
  bioBox: { paddingHorizontal: 16, gap: 2 },
  name: { fontWeight: '700' },
  bioInput: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 6, padding: 6 },
  buttons: { flexDirection: 'row', gap: 8, padding: 16 },
  button: { flex: 1, backgroundColor: '#efefef', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  buttonText: { fontWeight: '600' },
  logout: { color: '#ed4956' },
  thumb: { width: '33.33%', aspectRatio: 1, borderWidth: 1, borderColor: '#fff' },
  empty: { textAlign: 'center', color: '#8e8e8e', marginTop: 24 },
});
