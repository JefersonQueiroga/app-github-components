// Context API — guarda a lista de perfis salvos e compartilha entre as telas.
// Também salva a lista no celular (AsyncStorage) pra não perder ao fechar o app.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Formato de um perfil do GitHub que a gente guarda.
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

// Chave usada no AsyncStorage (tipo "nome do arquivo" no celular).
const STORAGE_KEY = 'ifrn-github-profiles';

// O que o Context vai oferecer pra quem usar useProfiles().
type ProfilesContextValue = {
  profiles: GithubProfile[];
  loaded: boolean;
  addProfile: (p: GithubProfile) => void;
  removeProfile: (login: string) => void;
  getByLogin: (login: string) => GithubProfile | undefined;
};

const ProfilesContext = createContext<ProfilesContextValue | null>(null);

// Provider — envolve o app inteiro (no _layout.tsx) pra todo mundo enxergar a lista.
export function ProfilesProvider({ children }: { children: ReactNode }) {
  // Estado: a lista de perfis na memória.
  const [profiles, setProfiles] = useState<GithubProfile[]>([]);
  // Flag pra saber se já terminou de ler o AsyncStorage.
  const [loaded, setLoaded] = useState(false);

  // 1) Quando o app abre: lê o que estava salvo no celular.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setProfiles(JSON.parse(raw));
      setLoaded(true);
    });
  }, []);

  // 2) Toda vez que a lista muda: salva de novo no celular.
  //    (só depois de carregar, pra não apagar o que tinha).
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles, loaded]);

  // Adiciona um perfil. Se já existir (mesmo login), substitui pelo novo.
  function addProfile(p: GithubProfile) {
    const semEsse = profiles.filter((x) => x.login !== p.login);
    const novo = { ...p, savedAt: Date.now() };
    setProfiles([novo, ...semEsse]);
  }

  // Remove um perfil pelo login.
  function removeProfile(login: string) {
    setProfiles(profiles.filter((p) => p.login !== login));
  }

  // Busca um perfil pelo login (usado na tela de detalhes).
  function getByLogin(login: string) {
    return profiles.find((p) => p.login === login);
  }

  return (
    <ProfilesContext.Provider value={{ profiles, loaded, addProfile, removeProfile, getByLogin }}>
      {children}
    </ProfilesContext.Provider>
  );
}

// Hook — atalho pra usar o context nas telas: const { profiles } = useProfiles().
export function useProfiles() {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error('useProfiles deve ser usado dentro de ProfilesProvider');
  return ctx;
}
