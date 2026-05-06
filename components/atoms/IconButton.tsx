// Atom — botão circular pequeno com ícone (usado no header).
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  size?: number;
  accessibilityLabel?: string;
};

export function IconButton({ icon, color, onPress, size = 36, accessibilityLabel }: Props) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
        },
        pressed && { opacity: 0.85 },
      ]}>
      <Ionicons name={icon} size={size * 0.55} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.33,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
