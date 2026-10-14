import { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canSubmit = username.trim() !== '' && password !== '';

  const handleLogin = () => {
    if (!login(username, password)) setError('Usuario o contraseña incorrectos.');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.logo}>Instagram</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        value={username}
        onChangeText={(t) => { setUsername(t); setError(''); }}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(t) => { setPassword(t); setError(''); }}
        onSubmitEditing={canSubmit ? handleLogin : undefined}
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Pressable style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={handleLogin} disabled={!canSubmit}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      <Text style={styles.hint}>Probá con nacho / 1234 o demo / demo</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 32, backgroundColor: '#fff', gap: 10 },
  logo: { fontSize: 44, fontStyle: 'italic', fontFamily: 'serif', textAlign: 'center', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  error: { color: '#ed4956', textAlign: 'center' },
  button: { backgroundColor: '#0095f6', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 6 },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '700' },
  hint: { color: '#8e8e8e', textAlign: 'center', marginTop: 12, fontSize: 12 },
});
