import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { validatePassword } from '../utils/validation';

const ChangePasswordScreen = ({ navigation }) => {
  const { changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = 'Password lama wajib diisi';
    const newPassError = validatePassword(newPassword);
    if (newPassError) newErrors.newPassword = newPassError;
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    if (newPassword && oldPassword && newPassword === oldPassword) {
      newErrors.newPassword = 'Password baru tidak boleh sama dengan password lama';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      Alert.alert('Gagal', err.message || 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearErr = (field) => {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Password</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {success && (
            <View style={styles.successBox}>
              <CheckCircle size={20} color="#16A34A" style={{ marginRight: 8 }} />
              <Text style={styles.successText}>
                Password berhasil diubah!
              </Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Buat Password Baru</Text>
            <Text style={styles.cardSubtitle}>
              Masukkan password lama Anda terlebih dahulu untuk konfirmasi identitas.
            </Text>

            <InputField
              label="Password Lama"
              value={oldPassword}
              onChangeText={(t) => { setOldPassword(t); clearErr('oldPassword'); setSuccess(false); }}
              placeholder="Masukkan password saat ini"
              secureTextEntry
              error={errors.oldPassword}
            />

            <InputField
              label="Password Baru"
              value={newPassword}
              onChangeText={(t) => { setNewPassword(t); clearErr('newPassword'); setSuccess(false); }}
              placeholder="Minimal 6 karakter"
              secureTextEntry
              error={errors.newPassword}
            />

            <InputField
              label="Konfirmasi Password Baru"
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); clearErr('confirmPassword'); setSuccess(false); }}
              placeholder="Ulangi password baru"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <ButtonPrimary
              title="Simpan Password Baru"
              onPress={handleChange}
              loading={isLoading}
              style={{ marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '600',
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginBottom: 24,
  },
});

export default ChangePasswordScreen;
