// Molecule — input de busca com lupa, spinner e botão de limpar.
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  loading?: boolean;
  primary: string;
  autoFocus?: boolean;
};

export function SearchField({
  value,
  onChange,
  onSubmit,
  placeholder,
  loading,
  primary,
  autoFocus,
}: Props) {
  return (
    <View style={styles.field}>
      <Ionicons name="search" size={17} color="rgba(60,60,67,0.5)" />
      <TextInput
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="rgba(60,60,67,0.4)"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoFocus={autoFocus}
        returnKeyType="done"
        style={styles.input}
      />
      {loading && <ActivityIndicator color={primary} />}
      {!!value && !loading && (
        <Pressable onPress={() => onChange('')} style={styles.clearBtn}>
          <Ionicons name="close" size={12} color="#fff" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 12,
    color: '#000',
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(60,60,67,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
