import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Analytics() {
  const mockData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43]
    }]
  };

  const statsCards = [
    { title: 'Total Workouts', value: '156', change: '+12%' },
    { title: 'Active Days', value: '23', change: '+5%' },
    { title: 'Average Duration', value: '45m', change: '-2%' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</Text>
          <Text className="text-gray-500 dark:text-gray-400 mt-1">Track your progress</Text>
          
          {/* Stats Cards */}
          <View className="flex-row flex-wrap justify-between mt-6">
            {statsCards.map((stat, index) => (
              <View key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl w-[30%] mb-4">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</Text>
                <Text className={`text-sm ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>

          {/* Chart */}
          <View className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Activity Overview
            </Text>
            <LineChart
              data={mockData}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={{
                borderRadius: 16
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
