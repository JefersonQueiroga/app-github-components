// Atom — bolinha de cor selecionável (usada no ThemePicker).
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  color: string;
  selected: boolean;
  onPress: () => void;
};

export function ColorSwatch({ color, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.swatch,
        { backgroundColor: color },
        selected && styles.selected,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  swatch: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#000',
  },
});
