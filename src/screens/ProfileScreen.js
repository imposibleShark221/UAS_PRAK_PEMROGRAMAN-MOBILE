import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import PlatformSafeAreaView from '../utils/safeAreaHelper';
import { useAuth } from '../context/AuthContext';
import ButtonPrimary from '../components/ButtonPrimary';
import { Heart, ShoppingBag, MapPin, Bell, Lock, HelpCircle, ChevronRight } from 'lucide-react-native';

const ProfileScreen = () => {
  const { user, logout, wishlist } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
            } catch (e) {
              console.warn('Logout error', e);
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  const avatarInitials = () => {
    const fullName = user?.firstName
      ? `${user.firstName} ${user.lastName || ''}`
      : user?.username || 'U';
    return fullName
      .split(' ')
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  };

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
    : 'Guest';

  const menuItems = [
    { icon: <Heart size={20} color="#4B5563" />, label: 'Wishlist saya', value: `${wishlist.length} item` },
    { icon: <ShoppingBag size={20} color="#4B5563" />, label: 'Pesanan saya', value: '0 pesanan' },
    { icon: <MapPin size={20} color="#4B5563" />, label: 'Alamat pengiriman', value: 'Tambah alamat' },
    { icon: <Bell size={20} color="#4B5563" />, label: 'Notifikasi', value: 'Aktif' },
    { icon: <Lock size={20} color="#4B5563" />, label: 'Ubah password', value: '' },
    { icon: <HelpCircle size={20} color="#4B5563" />, label: 'Bantuan & FAQ', value: '' },
  ];

  return (
    <PlatformSafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitials()}</Text>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{user?.email || 'Tidak tersedia'}</Text>
          <Text style={styles.username}>@{user?.username}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{wishlist.length}</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Pesanan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Ulasan</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <View style={styles.menuRight}>
                {item.value ? (
                  <Text style={styles.menuValue}>{item.value}</Text>
                ) : null}
                <ChevronRight size={18} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>KampusMarket v1.0.0</Text>
          <Text style={styles.appDesc}>
            Marketplace Mahasiswa Indonesia
          </Text>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <ButtonPrimary
            title={isLoggingOut ? 'Keluar...' : 'Keluar dari Akun'}
            onPress={handleLogout}
            loading={isLoggingOut}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </PlatformSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '600',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuValue: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  appDesc: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 2,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 16,
  },
  logoutButton: {
    borderColor: '#EF4444',
  },
});

export default ProfileScreen;
