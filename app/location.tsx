import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import Colors from '@/constants/colors';
import PetSelector from '@/components/PetSelector';
import { usePetStore } from '@/store/pet-store';

export default function LocationScreen() {
  const { getActivePet } = usePetStore();
  const activePet = getActivePet();

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Vị trí của {activePet?.name || 'thú cưng của bạn'}</Text>
        </View>

        <PetSelector />

        <View style={styles.mapContainer}>
          <WebView
            source={{
              uri: 'https://maps.app.goo.gl/sQ7YbhUXkyeFAqoX6',
            }}
            style={styles.map}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  mapContainer: {
    flex: 1,
    height: 600,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  map: {
    flex: 1,
  },
});
