// Organism — seletor de tema claro/escuro, consome o ThemeContext.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { THEME_MODES, ThemeMode, useTheme } from '@/contexts/ThemeContext';

const LABELS: Record<ThemeMode, string> = {
  light: 'Claro',
  dark: 'Escuro',
};

const ICONS: Record<ThemeMode, 'sunny' | 'moon'> = {
  light: 'sunny',
  dark: 'moon',
};

export function ThemePicker() {
  const { mode, setMode, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {THEME_MODES.map((m) => {
        const selected = m === mode;
        return (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            style={[
              styles.option,
              selected && { backgroundColor: colors.primary },
            ]}>
            <Ionicons
              name={ICONS[m]}
              size={16}
              color={selected ? '#fff' : colors.text}
            />
            <Text
              style={[
                styles.label,
                { color: selected ? '#fff' : colors.text },
              ]}>
              {LABELS[m]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
