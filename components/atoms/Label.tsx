// ATOM Label — textinho em CAIXA ALTA usado como legenda/título de seção. Só texto.
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export function Label({ children }: { children: string }) {
  const { colors } = useTheme();
  return <Text style={[styles.label, { color: colors.textMuted }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
