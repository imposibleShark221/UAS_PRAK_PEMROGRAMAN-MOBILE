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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { ShoppingCart, Lightbulb } from 'lucide-react-native';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      // DummyJSON uses username, not email.
      // We pass email/username as-is and AuthContext handles the parsing.
      await login(email.trim(), password);
      // Navigation happens automatically via RootNavigator state change
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Login gagal. Periksa kredensial Anda.';
      Alert.alert('Login Gagal', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <ShoppingCart size={36} color="#16A34A" />
            </View>
            <Text style={styles.title}>KampusMarket</Text>
            <Text style={styles.subtitle}>
              Marketplace Mahasiswa Indonesia
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Selamat Datang!</Text>
            <Text style={styles.cardSubtitle}>
              Masuk untuk mulai belanja
            </Text>

            <InputField
              label="Email / Username"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((e) => ({ ...e, email: null }));
              }}
              placeholder="emilys@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((e) => ({ ...e, password: null }));
              }}
              placeholder="Minimal 6 karakter"
              secureTextEntry
              error={errors.password}
            />

            <ButtonPrimary
              title="Masuk"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            {/* Hint */}
            <View style={styles.hintBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Lightbulb size={14} color="#166534" style={{ marginRight: 6 }} />
                <Text style={styles.hintText}>
                  Gunakan akun demo:{' '}
                  <Text style={styles.hintValue}>emilys</Text> / password:{' '}
                  <Text style={styles.hintValue}>emilyspass</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Register link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
  hintBox: {
    marginTop: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  hintText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 18,
  },
  hintValue: {
    fontWeight: '700',
    color: '#16A34A',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  registerLink: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '700',
  },
});

export default LoginScreen;
