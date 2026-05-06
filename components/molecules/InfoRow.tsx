// Molecule — linha com ícone, rótulo e valor (usada na lista de detalhes).
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor: string;
  isFirst: boolean;
  isLast: boolean;
};

export function InfoRow({ icon, label, value, iconColor, isFirst, isLast }: Props) {
  return (
    <View style={[styles.row, corners(isFirst, isLast), !isLast && styles.divider]}>
      <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export function corners(isFirst: boolean, isLast: boolean) {
  return {
    borderTopLeftRadius: isFirst ? 14 : 0,
    borderTopRightRadius: isFirst ? 14 : 0,
    borderBottomLeftRadius: isLast ? 14 : 0,
    borderBottomRightRadius: isLast ? 14 : 0,
  };
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
  label: { fontSize: 12, color: 'rgba(60,60,67,0.6)' },
  value: { fontSize: 16, color: '#000', marginTop: 1 },
});
