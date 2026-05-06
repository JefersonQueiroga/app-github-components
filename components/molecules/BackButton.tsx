// Molecule — chevron + texto, padrão iOS de "Voltar".
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
};

export function BackButton({ label, color, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Ionicons name="chevron-back" size={22} color={color} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
});
