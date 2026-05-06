// Molecule — linha que abre um link externo.
import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';

import { corners } from '@/components/molecules/InfoRow';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  url: string;
  color: string;
  isFirst: boolean;
  isLast: boolean;
};

export function LinkRow({ icon, label, url, color, isFirst, isLast }: Props) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={({ pressed }) => [
        styles.row,
        corners(isFirst, isLast),
        !isLast && styles.divider,
        pressed && { opacity: 0.6 },
      ]}>
      <Ionicons name={icon} size={18} color={color} style={styles.icon} />
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Ionicons name="open-outline" size={16} color={color} />
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
  label: { flex: 1, fontSize: 16, fontWeight: '500' },
});
