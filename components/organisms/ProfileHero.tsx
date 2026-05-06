// Organism — cabeçalho grande na tela de detalhes (avatar + nome + bio).
import { Image, StyleSheet, Text, View } from 'react-native';

import type { GithubProfile } from '@/contexts/ProfilesContext';

type Props = {
  profile: GithubProfile;
  primary: string;
};

export function ProfileHero({ profile, primary }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.ring, { backgroundColor: primary, shadowColor: primary }]}>
        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{profile.name || profile.login}</Text>
      <Text style={[styles.login, { color: primary }]}>@{profile.login}</Text>
      {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  ring: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 4,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
    backgroundColor: '#fff',
  },
  name: { fontSize: 24, fontWeight: '700', color: '#000', textAlign: 'center' },
  login: { fontSize: 16, fontWeight: '500', marginTop: -8 },
  bio: {
    fontSize: 15,
    color: 'rgba(60,60,67,0.85)',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 21,
    paddingHorizontal: 8,
  },
});
