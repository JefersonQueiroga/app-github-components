// 4.4 Context API — lista de perfis salvos compartilhada entre telas.
// Persistência via AsyncStorage (4.2 useEffect para efeito colateral).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  savedAt?: number;
};

const STORAGE_KEY = 'ifrn-github-profiles';

type ProfilesContextValue = {
  profiles: GithubProfile[];
  loaded: boolean;
  addProfile: (p: GithubProfile) => void;
  removeProfile: (login: string) => void;
  getByLogin: (login: string) => GithubProfile | undefined;
};

const ProfilesContext = createContext<ProfilesContextValue | null>(null);

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<GithubProfile[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Carrega ao montar
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setProfiles(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Persiste a cada mudança (depois de carregado, para não sobrescrever)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profiles)).catch(() => {});
  }, [profiles, loaded]);

  function addProfile(p: GithubProfile) {
    setProfiles((prev) => {
      const without = prev.filter((x) => x.login.toLowerCase() !== p.login.toLowerCase());
      return [{ ...p, savedAt: Date.now() }, ...without];
    });
  }

  function removeProfile(login: string) {
    setProfiles((prev) => prev.filter((x) => x.login !== login));
  }

  function getByLogin(login: string) {
    return profiles.find((p) => p.login.toLowerCase() === login.toLowerCase());
  }

  return (
    <ProfilesContext.Provider value={{ profiles, loaded, addProfile, removeProfile, getByLogin }}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error('useProfiles deve ser usado dentro de ProfilesProvider');
  return ctx;
}
