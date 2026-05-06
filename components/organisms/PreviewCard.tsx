// Organism — card de pré-visualização do perfil encontrado, antes de adicionar.
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/atoms/Avatar';
import { Button } from '@/components/atoms/Button';
import type { GithubProfile } from '@/contexts/ProfilesContext';

type Props = {
  profile: GithubProfile;
  primary: string;
  onAdd: () => void;
};

export function PreviewCard({ profile, primary, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar uri={profile.avatar_url} size={60} borderColor={primary + '22'} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {profile.name || profile.login}
          </Text>
          <Text style={[styles.login, { color: primary }]}>@{profile.login}</Text>
          <Text style={styles.stats}>
            {profile.followers} seguidores · {profile.public_repos} repos
          </Text>
        </View>
      </View>
      {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
      <Button label="Adicionar à minha lista" color={primary} icon="add" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: { fontSize: 17, fontWeight: '600', color: '#000' },
  login: { fontSize: 14, fontWeight: '500', marginTop: 1 },
  stats: { fontSize: 12, color: 'rgba(60,60,67,0.6)', marginTop: 2 },
  bio: { fontSize: 14, color: 'rgba(60,60,67,0.85)', lineHeight: 20 },
});
