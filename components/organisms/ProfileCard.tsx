// Organism — card de um perfil na lista (avatar + nome + chevron).
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/atoms/Avatar';
import type { GithubProfile } from '@/contexts/ProfilesContext';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  profile: GithubProfile;
  primary: string;
  onPress: () => void;
};

export function ProfileCard({ profile, primary, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface },
        pressed && styles.pressed,
      ]}>
      <Avatar uri={profile.avatar_url} size={56} borderColor={primary + '22'} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {profile.name || profile.login}
        </Text>
        <Text style={[styles.login, { color: primary }]} numberOfLines={1}>
          @{profile.login}
        </Text>
        {profile.bio && (
          <Text style={[styles.bio, { color: colors.textMuted }]} numberOfLines={1}>
            {profile.bio}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
  name: { fontSize: 16, fontWeight: '600' },
  login: { fontSize: 14, fontWeight: '500', marginTop: 1 },
  bio: { fontSize: 13, marginTop: 2 },
});
