// Organism — seletor de tema, consome o ThemeContext.
import { StyleSheet, View } from 'react-native';

import { ColorSwatch } from '@/components/atoms/ColorSwatch';
import { Label } from '@/components/atoms/Label';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemePicker() {
  const { primary, setPrimary, options } = useTheme();

  return (
    <View style={styles.container}>
      <Label>Tema</Label>
      <View style={styles.swatches}>
        {options.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            selected={color === primary}
            onPress={() => setPrimary(color)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  swatches: {
    flexDirection: 'row',
    gap: 8,
  },
});
