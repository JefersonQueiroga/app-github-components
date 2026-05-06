// Page — Adicionar perfil (busca debounced na API do GitHub).
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/molecules/BackButton';
import { SearchField } from '@/components/molecules/SearchField';
import { StatusMsg } from '@/components/molecules/StatusMsg';
import { PreviewCard } from '@/components/organisms/PreviewCard';
import { Suggestions } from '@/components/organisms/Suggestions';
import { TopBar } from '@/components/organisms/TopBar';
import { useProfiles, type GithubProfile } from '@/contexts/ProfilesContext';
import { useTheme } from '@/contexts/ThemeContext';

type Status = 'idle' | 'loading' | 'found' | 'not_found' | 'exists' | 'error';

export default function AddPage() {
  const router = useRouter();
  const { primary } = useTheme();
  const { profiles, addProfile } = useProfiles();

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [preview, setPreview] = useState<GithubProfile | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqIdRef = useRef(0);

  const existing = profiles.map((p) => p.login.toLowerCase());
  const existingKey = existing.join(',');

  useEffect(() => {
    const u = username.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!u) {
      setStatus('idle');
      setPreview(null);
      return;
    }
    const existingList = existingKey ? existingKey.split(',') : [];
    if (existingList.includes(u.toLowerCase())) {
      setStatus('exists');
      setPreview(null);
      return;
    }

    setStatus('loading');
    debounceRef.current = setTimeout(async () => {
      const reqId = ++reqIdRef.current;
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(u)}`);
        if (reqId !== reqIdRef.current) return;
        if (res.status === 404) {
          setStatus('not_found');
          setPreview(null);
          return;
        }
        if (!res.ok) {
          setStatus('error');
          setPreview(null);
          return;
        }
        const data = await res.json();
        setPreview({
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url,
          bio: data.bio,
          company: data.company,
          location: data.location,
          html_url: data.html_url,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
        });
        setStatus('found');
      } catch {
        if (reqId !== reqIdRef.current) return;
        setStatus('error');
        setPreview(null);
      }
    }, 450);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username, existingKey]);

  function handleAdd() {
    if (status === 'found' && preview) {
      addProfile(preview);
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <TopBar
        title="Novo perfil"
        left={<BackButton label="Voltar" color={primary} onPress={() => router.back()} />}
      />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SearchField
          value={username}
          onChange={setUsername}
          onSubmit={handleAdd}
          placeholder="username do GitHub"
          loading={status === 'loading'}
          primary={primary}
          autoFocus
        />

        {status === 'idle' && (
          <Suggestions primary={primary} onPick={setUsername} existing={existing} />
        )}
        {status === 'not_found' && (
          <StatusMsg tone="warn" text="Nenhum usuário encontrado com esse nome." />
        )}
        {status === 'exists' && (
          <StatusMsg tone="info" text="Esse perfil já está na sua lista." />
        )}
        {status === 'error' && (
          <StatusMsg tone="warn" text="Erro ao buscar. Verifique sua conexão." />
        )}
        {status === 'found' && preview && (
          <PreviewCard profile={preview} primary={primary} onAdd={handleAdd} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40, gap: 12 },
});
