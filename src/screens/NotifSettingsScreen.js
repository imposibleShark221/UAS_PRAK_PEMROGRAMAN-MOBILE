import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Bell, BellOff, Info } from 'lucide-react-native';

const NotifSettingsScreen = ({ navigation }) => {
  const { notifEnabled, toggleNotif } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.iconCircle, { backgroundColor: notifEnabled ? '#DCFCE7' : '#F3F4F6' }]}>
            {notifEnabled
              ? <Bell size={28} color="#16A34A" />
              : <BellOff size={28} color="#9CA3AF" />}
          </View>
          <Text style={styles.statusTitle}>
            {notifEnabled ? 'Notifikasi Aktif' : 'Notifikasi Dinonaktifkan'}
          </Text>
          <Text style={styles.statusSubtitle}>
            {notifEnabled
              ? 'Anda akan menerima pemberitahuan tentang promo dan pesanan terbaru.'
              : 'Aktifkan untuk mendapatkan info promo dan update pesanan.'}
          </Text>
        </View>

        {/* Toggle Row */}
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#4B5563" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.settingLabel}>Semua Notifikasi</Text>
                <Text style={styles.settingDesc}>Promo, pesanan, dan aktivitas akun</Text>
              </View>
            </View>
            <Switch
              value={notifEnabled}
              onValueChange={toggleNotif}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={notifEnabled ? '#22C55E' : '#F4F4F5'}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Info note */}
        <View style={styles.infoBox}>
          <Info size={14} color="#6B7280" style={{ marginRight: 8, marginTop: 1 }} />
          <Text style={styles.infoText}>
            Pengaturan notifikasi disimpan secara lokal di perangkat Anda.
          </Text>
        </View>
      </ScrollView>
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  settingDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
    lineHeight: 18,
  },
});

export default NotifSettingsScreen;
