// Page — Lista de perfis (FlatList).
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/components/atoms/IconButton';
import { Label } from '@/components/atoms/Label';
import { EmptyState } from '@/components/organisms/EmptyState';
import { ProfileCard } from '@/components/organisms/ProfileCard';
import { ThemePicker } from '@/components/organisms/ThemePicker';
import { TopBar } from '@/components/organisms/TopBar';
import { useProfiles } from '@/contexts/ProfilesContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ListPage() {
  const router = useRouter();
  const { primary } = useTheme();
  const { profiles } = useProfiles();

  const isEmpty = profiles.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <TopBar
        title="Perfis"
        large
        right={
          <IconButton
            icon="add"
            color={primary}
            onPress={() => router.push('/add')}
            accessibilityLabel="Adicionar perfil"
          />
        }
      />

      {isEmpty ? (
        <EmptyState primary={primary} onAdd={() => router.push('/add')} />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.login}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={
            <View style={styles.countWrap}>
              <Label>
                {`${profiles.length} ${profiles.length === 1 ? 'perfil salvo' : 'perfis salvos'}`}
              </Label>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <ThemePicker />
            </View>
          }
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              primary={primary}
              onPress={() => router.push(`/profile/${item.login}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  countWrap: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  footer: {
    paddingTop: 24,
  },
});
