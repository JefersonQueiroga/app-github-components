// ATOM Chip — pílula clicável usada nas sugestões de username. Só estilo + onPress.
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
};

export function Chip({ label, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { borderColor: color + '33' },
        pressed && { opacity: 0.6 },
      ]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
