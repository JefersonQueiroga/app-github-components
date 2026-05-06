// Atom — imagem circular com borda fina.
import { Image, StyleSheet } from 'react-native';

type Props = {
  uri: string;
  size?: number;
  borderColor?: string;
};

export function Avatar({ uri, size = 56, borderColor = 'rgba(0,0,0,0.05)' }: Props) {
  return (
    <Image
      source={{ uri }}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    backgroundColor: '#eee',
  },
});
