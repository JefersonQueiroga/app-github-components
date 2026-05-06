// Organism — bloco de sugestões com chips e texto de ajuda.
import { StyleSheet, Text, View } from 'react-native';

import { Chip } from '@/components/atoms/Chip';
import { Label } from '@/components/atoms/Label';

type Props = {
  primary: string;
  onPick: (username: string) => void;
  existing: string[];
};

const SAMPLE = ['torvalds', 'gaearon', 'tj', 'sindresorhus'];

export function Suggestions({ primary, onPick, existing }: Props) {
  const items = SAMPLE.filter((s) => !existing.includes(s.toLowerCase()));
  return (
    <View style={{ gap: 8 }}>
      <View style={styles.titleWrap}>
        <Label>Sugestões para começar</Label>
      </View>
      <View style={styles.chips}>
        {items.map((s) => (
          <Chip key={s} label={`@${s}`} color={primary} onPress={() => onPick(s)} />
        ))}
      </View>
      <Text style={styles.help}>
        Digite um username e veja o perfil aparecer. Os dados vêm de api.github.com e são salvos no
        seu aparelho.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrap: {
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  help: {
    fontSize: 13,
    color: 'rgba(60,60,67,0.55)',
    paddingHorizontal: 4,
    paddingTop: 12,
    lineHeight: 19,
  },
});
