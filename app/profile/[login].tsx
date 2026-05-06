// Page — Detalhes do perfil (SectionList agrupando dados).
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Label } from '@/components/atoms/Label';
import { ActionRow } from '@/components/molecules/ActionRow';
import { BackButton } from '@/components/molecules/BackButton';
import { InfoRow } from '@/components/molecules/InfoRow';
import { LinkRow } from '@/components/molecules/LinkRow';
import { ProfileHero } from '@/components/organisms/ProfileHero';
import { TopBar } from '@/components/organisms/TopBar';
import { useProfiles } from '@/contexts/ProfilesContext';
import { useTheme } from '@/contexts/ThemeContext';

import type { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

type SectionRow =
  | { kind: 'info'; icon: IconName; label: string; value: string }
  | { kind: 'link'; icon: IconName; label: string; url: string }
  | { kind: 'action'; icon: IconName; label: string; onPress: () => void };

type Section = {
  title: string;
  data: SectionRow[];
};

export default function DetailPage() {
  const router = useRouter();
  const { login } = useLocalSearchParams<{ login: string }>();
  const { primary } = useTheme();
  const { getByLogin, removeProfile } = useProfiles();

  const profile = login ? getByLogin(login) : undefined;

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBar
          title="Perfil"
          left={<BackButton label="Perfis" color={primary} onPress={() => router.back()} />}
        />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Perfil não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  function handleRemove() {
    if (!profile) return;
    Alert.alert('Remover perfil', `Remover @${profile.login} dos seus perfis?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removeProfile(profile.login);
          router.back();
        },
      },
    ]);
  }

  const infoRows: SectionRow[] = [];
  if (profile.company) {
    infoRows.push({ kind: 'info', icon: 'business', label: 'Empresa', value: profile.company });
  }
  if (profile.location) {
    infoRows.push({ kind: 'info', icon: 'location', label: 'Localização', value: profile.location });
  }

  const statsRows: SectionRow[] = [
    { kind: 'info', icon: 'people', label: 'Seguidores', value: String(profile.followers) },
    { kind: 'info', icon: 'person-add', label: 'Seguindo', value: String(profile.following) },
    {
      kind: 'info',
      icon: 'folder',
      label: 'Repositórios públicos',
      value: String(profile.public_repos),
    },
  ];
  const linkRows: SectionRow[] = [
    { kind: 'link', icon: 'link', label: 'Abrir no GitHub', url: profile.html_url },
  ];
  const actionRows: SectionRow[] = [
    { kind: 'action', icon: 'trash', label: 'Remover dos perfis', onPress: handleRemove },
  ];

  const sections: Section[] = [
    { title: 'Informações', data: infoRows },
    { title: 'Estatísticas', data: statsRows },
    { title: 'Links', data: linkRows },
    { title: 'Ações', data: actionRows },
  ].filter((s) => s.data.length > 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <TopBar
        title="Perfil"
        left={<BackButton label="Perfis" color={primary} onPress={() => router.back()} />}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item.label + idx}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ProfileHero profile={profile} primary={primary} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Label>{section.title}</Label>
          </View>
        )}
        renderItem={({ item, index, section }) => {
          const isFirst = index === 0;
          const isLast = index === section.data.length - 1;
          if (item.kind === 'info') {
            return (
              <InfoRow
                icon={item.icon}
                label={item.label}
                value={item.value}
                iconColor={primary}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }
          if (item.kind === 'link') {
            return (
              <LinkRow
                icon={item.icon}
                label={item.label}
                url={item.url}
                color={primary}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }
          return (
            <ActionRow
              icon={item.icon}
              label={item.label}
              onPress={item.onPress}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        }}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16, color: 'rgba(60,60,67,0.6)' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionHeader: { paddingHorizontal: 4, paddingTop: 16, paddingBottom: 6 },
});
