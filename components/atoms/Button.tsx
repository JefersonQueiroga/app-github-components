// Atom — botão primário sólido com ícone opcional.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'md' | 'lg';
};

export function Button({ label, color, onPress, icon, size = 'md' }: Props) {
  const isLarge = size === 'lg';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isLarge ? styles.lg : styles.md,
        { backgroundColor: color, shadowColor: color },
        pressed && { opacity: 0.85 },
      ]}>
      {icon && <Ionicons name={icon} size={isLarge ? 18 : 16} color="#fff" />}
      <Text style={[styles.label, { fontSize: isLarge ? 16 : 15 }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowOpacity: 0.27,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  md: {
    paddingVertical: 12,
    borderRadius: 12,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
});
