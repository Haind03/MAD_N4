import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AlertCircle, ArrowLeft, Bookmark, Share2, ChevronDown, ChevronUp } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { getDiseaseById } from '@/mocks/diseases';

export default function DiseaseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['symptoms']);
  
  const disease = getDiseaseById(id as string);
  
  if (!disease) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{
          headerShown: false,
        }} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Không tìm thấy thông tin bệnh</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <Stack.Screen options={{
        headerShown: false,
      }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backIconContainer}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionIconContainer}
              onPress={toggleSave}
            >
              <Bookmark 
                size={24} 
                color={isSaved ? Colors.primary : Colors.text} 
                fill={isSaved ? Colors.primary : 'transparent'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionIconContainer}>
              <Share2 size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.diseaseHeader}>
          <View style={styles.diseaseIconContainer}>
            <AlertCircle size={32} color={Colors.error} />
          </View>
          <Text style={styles.diseaseTitle}>{disease.name}</Text>
          <Text style={styles.diseaseSubtitle}>{disease.scientificName}</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewText}>{disease.description}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Mức độ nghiêm trọng</Text>
              <View style={styles.severityIndicator}>
                {Array(5).fill(0).map((_, index) => (
                  <View 
                    key={index}
                    style={[
                      styles.severityDot,
                      index < disease.severity && styles.activeSeverityDot
                    ]}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Khả năng lây nhiễm</Text>
              <Text style={styles.statValue}>
                {disease.contagious ? 'Có thể lây nhiễm' : 'Không lây nhiễm'}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Phổ biến ở</Text>
              <Text style={styles.statValue}>{disease.commonIn.join(', ')}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('symptoms')}
          >
            <Text style={styles.sectionTitle}>Triệu chứng</Text>
            {isSectionExpanded('symptoms') ? (
              <ChevronUp size={20} color={Colors.text} />
            ) : (
              <ChevronDown size={20} color={Colors.text} />
            )}
          </TouchableOpacity>
          
          {isSectionExpanded('symptoms') && (
            <View style={styles.sectionContent}>
              <View style={styles.symptomsList}>
                {disease.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.symptomText}>{symptom}</Text>
                  </View>
                ))}
              </View>
              
              {disease.images && disease.images.length > 0 && (
                <View style={styles.imagesContainer}>
                  <Text style={styles.imagesTitle}>Hình ảnh tham khảo</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.imagesScroll}
                  >
                    {disease.images.map((image, index) => (
                      <Image 
                        key={index}
                        source={{ uri: image }}
                        style={styles.diseaseImage}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('causes')}
          >
            <Text style={styles.sectionTitle}>Nguyên nhân</Text>
            {isSectionExpanded('causes') ? (
              <ChevronUp size={20} color={Colors.text} />
            ) : (
              <ChevronDown size={20} color={Colors.text} />
            )}
          </TouchableOpacity>
          
          {isSectionExpanded('causes') && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{disease.causes}</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('treatment')}
          >
            <Text style={styles.sectionTitle}>Điều trị</Text>
            {isSectionExpanded('treatment') ? (
              <ChevronUp size={20} color={Colors.text} />
            ) : (
              <ChevronDown size={20} color={Colors.text} />
            )}
          </TouchableOpacity>
          
          {isSectionExpanded('treatment') && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{disease.treatment}</Text>
              
              {disease.medications && disease.medications.length > 0 && (
                <View style={styles.medicationsContainer}>
                  <Text style={styles.medicationsTitle}>Thuốc thường dùng</Text>
                  {disease.medications.map((medication, index) => (
                    <View key={index} style={styles.medicationItem}>
                      <Text style={styles.medicationName}>{medication.name}</Text>
                      <Text style={styles.medicationDescription}>{medication.description}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('prevention')}
          >
            <Text style={styles.sectionTitle}>Phòng ngừa</Text>
            {isSectionExpanded('prevention') ? (
              <ChevronUp size={20} color={Colors.text} />
            ) : (
              <ChevronDown size={20} color={Colors.text} />
            )}
          </TouchableOpacity>
          
          {isSectionExpanded('prevention') && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{disease.prevention}</Text>
            </View>
          )}
          
          <View style={styles.disclaimerContainer}>
            <AlertCircle size={20} color={Colors.error} />
            <Text style={styles.disclaimerText}>
              Thông tin chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ thú y để được tư vấn chính xác.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  diseaseHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  diseaseIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.error + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  diseaseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  diseaseSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  overviewContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  statsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  severityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.lightGray,
    marginLeft: 4,
  },
  activeSeverityDot: {
    backgroundColor: Colors.error,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  sectionContent: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
  },
  symptomsList: {
    marginBottom: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    marginTop: 6,
    marginRight: 8,
  },
  symptomText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  imagesContainer: {
    marginTop: 16,
  },
  imagesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  imagesScroll: {
    flexDirection: 'row',
  },
  diseaseImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  medicationsContainer: {
    marginTop: 16,
  },
  medicationsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  medicationItem: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  medicationDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.error + '10',
    borderRadius: 12,
    padding: 16,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    lineHeight: 20,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.card,
  },
});