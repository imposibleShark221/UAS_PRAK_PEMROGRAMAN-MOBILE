import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import PlatformSafeAreaView from '../utils/safeAreaHelper';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { ArrowLeft } from 'lucide-react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmError) newErrors.confirmPassword = confirmError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);
    // Simulate async registration (no real endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    Alert.alert(
      'Registrasi Berhasil!',
      `Selamat datang, ${name.trim()}! Silakan masuk menggunakan akun Anda.`,
      [{ text: 'Masuk Sekarang', onPress: () => navigation.navigate('Login') }]
    );
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  return (
    <PlatformSafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={16} color="#374151" style={{ marginRight: 6 }} />
            <Text style={styles.backText}>Kembali</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Buat Akun</Text>
            <Text style={styles.subtitle}>
              Daftar dan mulai belanja di KampusMarket
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <InputField
              label="Nama Lengkap"
              value={name}
              onChangeText={(text) => { setName(text); clearError('name'); }}
              placeholder="Masukkan nama lengkap"
              error={errors.name}
            />

            <InputField
              label="Email"
              value={email}
              onChangeText={(text) => { setEmail(text); clearError('email'); }}
              placeholder="email@kampus.ac.id"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => { setPassword(text); clearError('password'); }}
              placeholder="Minimal 6 karakter"
              secureTextEntry
              error={errors.password}
            />

            <InputField
              label="Konfirmasi Password"
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); clearError('confirmPassword'); }}
              placeholder="Ulangi password"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <ButtonPrimary
              title="Daftar Sekarang"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PlatformSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
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
  registerButton: {
    marginTop: 8,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '700',
  },
});

export default RegisterScreen;
