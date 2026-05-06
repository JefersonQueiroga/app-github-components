// Organism — estado vazio: ilustração circular + título + descrição + CTA.
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';

type Props = {
  primary: string;
  onAdd: () => void;
};

export function EmptyState({ primary, onAdd }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: primary, shadowColor: primary }]}>
        <Ionicons name="logo-github" size={64} color="#fff" />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Nenhum perfil ainda</Text>
        <Text style={styles.subtitle}>
          Adicione perfis do GitHub pelo username e veja seus dados aqui.
        </Text>
      </View>
      <Button label="Adicionar perfil" color={primary} icon="add" size="lg" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
    paddingBottom: 24,
    gap: 20,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(60,60,67,0.7)',
    lineHeight: 21,
    maxWidth: 280,
    textAlign: 'center',
  },
});
