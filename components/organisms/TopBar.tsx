// Organism — barra superior das telas, com slots laterais (children-like via props).
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  large?: boolean;
  left?: ReactNode;
  right?: ReactNode;
};

export function TopBar({ title, large, left, right }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <View style={styles.side}>{left}</View>
        {!large && <Text style={styles.titleSmall}>{title}</Text>}
        <View style={[styles.side, { alignItems: 'flex-end' }]}>{right}</View>
      </View>
      {large && <Text style={styles.titleLarge}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 36,
  },
  side: {
    minWidth: 60,
  },
  titleSmall: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.43,
    color: '#000',
  },
  titleLarge: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#000',
    paddingTop: 4,
    paddingBottom: 4,
  },
});
