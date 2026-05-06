// Molecule — linha de ação destrutiva (cor vermelha iOS).
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { corners } from '@/components/molecules/InfoRow';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const DESTRUCTIVE = '#FF3B30';

export function ActionRow({ icon, label, onPress, isFirst, isLast }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        corners(isFirst, isLast),
        !isLast && styles.divider,
        pressed && { opacity: 0.6 },
      ]}>
      <Ionicons name={icon} size={18} color={DESTRUCTIVE} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60,60,67,0.15)',
  },
  icon: { width: 22, textAlign: 'center' },
  label: { flex: 1, fontSize: 16, fontWeight: '500', color: DESTRUCTIVE },
});
