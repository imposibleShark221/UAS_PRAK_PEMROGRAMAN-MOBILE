import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react-native';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.faqQuestion}>{question}</Text>
        {isOpen ? <ChevronUp size={18} color="#4B5563" /> : <ChevronDown size={18} color="#4B5563" />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.faqBody}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const HelpScreen = ({ navigation }) => {
  const faqs = [
    {
      question: 'Apa itu KampusMarket?',
      answer: 'KampusMarket adalah platform jual-beli khusus mahasiswa Indonesia untuk memudahkan transaksi barang bekas, buku, elektronik, dan lainnya di sekitar lingkungan kampus.',
    },
    {
      question: 'Bagaimana cara membeli barang?',
      answer: 'Cari produk yang Anda inginkan di halaman Beranda. Klik produk tersebut untuk melihat detail produk, lalu Anda dapat menyimpannya ke Wishlist atau menghubungi penjual jika informasi kontak tersedia.',
    },
    {
      question: 'Bagaimana cara menambahkan alamat pengiriman?',
      answer: 'Masuk ke menu Profil, pilih "Alamat pengiriman", kemudian klik tombol tambah (+) di pojok kanan atas untuk mengisi dan menyimpan alamat baru Anda.',
    },
    {
      question: 'Bagaimana cara mengubah password?',
      answer: 'Anda dapat mengubah password dari menu Profil dengan memilih opsi "Ubah password". Anda harus memasukkan password lama Anda sebelum dapat membuat password baru.',
    },
    {
      question: 'Apakah aplikasi ini menggunakan data asli?',
      answer: 'Untuk kebutuhan demonstrasi praktikum, aplikasi ini menggunakan DummyJSON API untuk produk dan autentikasi dasar, serta menggunakan penyimpanan lokal (AsyncStorage) untuk wishlist dan alamat.',
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bantuan & FAQ</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Contact Support */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Butuh Bantuan Lain?</Text>
          <Text style={styles.supportSubtitle}>Hubungi tim dukungan kami jika Anda memiliki masalah atau pertanyaan lain.</Text>
          
          <View style={styles.contactRow}>
            <Mail size={16} color="#22C55E" style={{ marginRight: 10 }} />
            <Text style={styles.contactText}>support@kampusmarket.co.id</Text>
          </View>
          
          <View style={styles.contactRow}>
            <Phone size={16} color="#22C55E" style={{ marginRight: 10 }} />
            <Text style={styles.contactText}>+62 812-3456-7890</Text>
          </View>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Pertanyaan Populer</Text>
        <View style={styles.faqList}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </View>

        {/* Version info */}
        <Text style={styles.versionText}>KampusMarket v1.0.0 (UAS Edition)</Text>
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
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  supportSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    paddingLeft: 4,
  },
  faqList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginRight: 12,
    lineHeight: 19,
  },
  faqBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  faqAnswer: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
  },
  versionText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 32,
    fontWeight: '500',
  },
});

export default HelpScreen;
