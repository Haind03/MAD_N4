import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Colors from '@/constants/colors';
import PetSelector from '@/components/PetSelector';
import { usePetStore } from '@/store/pet-store';

type Period = 'day' | 'week' | 'month';

export default function StatisticsScreen() {
  const [activePeriod, setActivePeriod] = useState<Period>('week');
  const router = useRouter();
  const { activePetId, getPetById } = usePetStore();
  const activePet = activePetId ? getPetById(activePetId) : null;

  const screenWidth = Dimensions.get('window').width - 32;

  const chartConfig = {
    backgroundGradientFrom: Colors.card,
    backgroundGradientTo: Colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74, 111, 165, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: Colors.primary,
    },
  };

  // Activity data
  const activityData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [45, 30, 58, 45, 47, 65, 38],
        color: (opacity = 1) => `rgba(74, 111, 165, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Phút'],
  };

  // Weight data
  const weightData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.8],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  // Pie chart data
  const pieData = [
    {
      name: 'Ngủ',
      population: 12,
      color: Colors.primary,
      legendFontColor: Colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Ăn',
      population: 4,
      color: Colors.secondary,
      legendFontColor: Colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Chơi',
      population: 6,
      color: Colors.info,
      legendFontColor: Colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Đi dạo',
      population: 2,
      color: Colors.success,
      legendFontColor: Colors.text,
      legendFontSize: 12,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
      </View>

      <PetSelector />

      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            activePeriod === 'day' && styles.activePeriodButton,
          ]}
          onPress={() => setActivePeriod('day')}
        >
          <Text
            style={[
              styles.periodButtonText,
              activePeriod === 'day' && styles.activePeriodButtonText,
            ]}
          >
            Ngày
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            activePeriod === 'week' && styles.activePeriodButton,
          ]}
          onPress={() => setActivePeriod('week')}
        >
          <Text
            style={[
              styles.periodButtonText,
              activePeriod === 'week' && styles.activePeriodButtonText,
            ]}
          >
            Tuần
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            activePeriod === 'month' && styles.activePeriodButton,
          ]}
          onPress={() => setActivePeriod('month')}
        >
          <Text
            style={[
              styles.periodButtonText,
              activePeriod === 'month' && styles.activePeriodButtonText,
            ]}
          >
            Tháng
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Hoạt động hàng tuần</Text>
          <Text style={styles.chartSubtitle}>Trung bình: 45 phút / Trung bình</Text>
          
          <LineChart
            data={activityData}
            width={screenWidth - 50}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          
          <View style={styles.activityLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
              <Text style={styles.legendText}>Cao ({">"} 60 phút)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Trung bình (30-60 phút)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.error }]} />
              <Text style={styles.legendText}>Thấp ({"<"} 30 phút)</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Cân nặng</Text>
          <Text style={styles.chartSubtitle}>Theo dõi sự thay đổi cân nặng</Text>
          
          <LineChart
            data={weightData}
            width={screenWidth-50}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(255, 179, 71, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: Colors.secondary,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Thời gian hoạt động</Text>
          <Text style={styles.chartSubtitle}>Phút hoạt động mỗi ngày</Text>
          
          <BarChart
            data={barData}
            width={screenWidth-50}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              barPercentage: 0.6, // giảm chiều rộng cột để trông gọn hơn
              decimalPlaces: 0
            }}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Phân bổ hoạt động</Text>
          <Text style={styles.chartSubtitle}>Giờ mỗi ngày</Text>
          
          <PieChart
            data={pieData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
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
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  activePeriodButton: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  activePeriodButtonText: {
    color: Colors.card,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 0,
    marginHorizontal:-10,

  },
  activityLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});