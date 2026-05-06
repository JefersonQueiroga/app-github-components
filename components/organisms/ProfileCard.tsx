// Organism — card de um perfil na lista (avatar + nome + chevron).
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/atoms/Avatar';
import type { GithubProfile } from '@/contexts/ProfilesContext';

type Props = {
  profile: GithubProfile;
  primary: string;
  onPress: () => void;
};

export function ProfileCard({ profile, primary, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Avatar uri={profile.avatar_url} size={56} borderColor={primary + '22'} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {profile.name || profile.login}
        </Text>
        <Text style={[styles.login, { color: primary }]} numberOfLines={1}>
          @{profile.login}
        </Text>
        {profile.bio && (
          <Text style={styles.bio} numberOfLines={1}>
            {profile.bio}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color="rgba(60,60,67,0.3)" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 16, fontWeight: '600', color: '#000' },
  login: { fontSize: 14, fontWeight: '500', marginTop: 1 },
  bio: { fontSize: 13, color: 'rgba(60,60,67,0.7)', marginTop: 2 },
});
