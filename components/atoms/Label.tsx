// Atom — texto pequeno em maiúsculas (cabeçalhos de seção/legendas).
import { StyleSheet, Text } from 'react-native';

export function Label({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: 'rgba(60,60,67,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
