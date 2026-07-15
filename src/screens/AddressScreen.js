import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';
import ButtonPrimary from '../components/ButtonPrimary';
import { ArrowLeft, MapPin, Trash2, Plus, X } from 'lucide-react-native';

const AddressScreen = ({ navigation }) => {
  const { addresses, addAddress, removeAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nama penerima wajib diisi';
    if (!form.phone.trim()) newErrors.phone = 'Nomor HP wajib diisi';
    if (!form.street.trim()) newErrors.street = 'Alamat jalan wajib diisi';
    if (!form.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;
    addAddress({ ...form });
    setForm({ name: '', phone: '', street: '', city: '', postalCode: '' });
    setErrors({});
    setShowForm(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Hapus Alamat',
      'Apakah Anda yakin ingin menghapus alamat ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => removeAddress(id) },
      ]
    );
  };

  const Field = ({ label, field, placeholder, keyboardType = 'default' }) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, errors[field] && styles.fieldInputError]}
        value={form[field]}
        onChangeText={(t) => {
          setForm((f) => ({ ...f, [field]: t }));
          if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
        }}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
      />
      {errors[field] ? (
        <Text style={styles.fieldError}>{errors[field]}</Text>
      ) : null}
    </View>
  );

  const renderAddress = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressIcon}>
        <MapPin size={20} color="#22C55E" />
      </View>
      <View style={styles.addressInfo}>
        <Text style={styles.addressName}>{item.name}</Text>
        <Text style={styles.addressPhone}>{item.phone}</Text>
        <Text style={styles.addressDetail}>{item.street}</Text>
        <Text style={styles.addressDetail}>
          {item.city}, {item.postalCode}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alamat Pengiriman</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowForm((v) => !v)}
        >
          {showForm
            ? <X size={20} color="#6B7280" />
            : <Plus size={20} color="#22C55E" />}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Add Address Form */}
          {showForm && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Tambah Alamat Baru</Text>
              <Field label="Nama Penerima" field="name" placeholder="Contoh: Budi Santoso" />
              <Field label="Nomor HP" field="phone" placeholder="08xx-xxxx-xxxx" keyboardType="phone-pad" />
              <Field label="Alamat Jalan" field="street" placeholder="Jl. Merdeka No. 10" />
              <Field label="Kota" field="city" placeholder="Jakarta" />
              <Field label="Kode Pos" field="postalCode" placeholder="12345" keyboardType="numeric" />
              <ButtonPrimary title="Simpan Alamat" onPress={handleAdd} style={{ marginTop: 4 }} />
            </View>
          )}

          {/* Address List */}
          {addresses.length === 0 && !showForm ? (
            <View style={styles.emptyWrap}>
              <EmptyState
                icon={<MapPin size={40} color="#9CA3AF" />}
                title="Belum ada alamat"
                subtitle="Tekan tombol + untuk menambahkan alamat pengiriman"
              />
            </View>
          ) : (
            <View style={styles.listContent}>
              {addresses.map((item) => renderAddress({ item }))}
            </View>
          )}
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  field: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: '#111827',
  },
  fieldInputError: { borderColor: '#EF4444' },
  fieldError: { fontSize: 12, color: '#EF4444', marginTop: 4 },
  listContent: { padding: 20, paddingBottom: 40 },
  emptyWrap: { flex: 1, marginTop: 40 },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'flex-start',
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressInfo: { flex: 1 },
  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
});

export default AddressScreen;
