// Molecule — caixa colorida de mensagem (warn / info).
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  tone: 'warn' | 'info';
  text: string;
};

const PALETTE = {
  warn: { bg: '#FFE5E3', fg: '#C9302C' },
  info: { bg: '#E8F0FE', fg: '#1A56DB' },
};

export function StatusMsg({ tone, text }: Props) {
  const colors = PALETTE[tone];
  return (
    <View style={[styles.box, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
