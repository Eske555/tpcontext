import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { PostsProvider } from './src/context/PostsContext';
import TabBar from './src/components/TabBar';
import LoginScreen from './src/screens/LoginScreen';
import FeedScreen from './src/screens/FeedScreen';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const SCREENS = { feed: FeedScreen, saved: SavedScreen, profile: ProfileScreen };

// Decide qué mostrar según el usuario logueado que viene del AuthContext.
function Main() {
  const { isLoggedIn } = useContext(AuthContext);
  const [tab, setTab] = useState('feed');

  if (!isLoggedIn) return <LoginScreen />;

  const Screen = SCREENS[tab];
  return (
    <>
      <Screen />
      <TabBar current={tab} onChange={setTab} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PostsProvider>
          <SafeAreaView style={styles.safe}>
            <Main />
            <StatusBar style="dark" />
          </SafeAreaView>
        </PostsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
});
