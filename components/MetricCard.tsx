import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { MetricItem } from '../types/task';

interface Props {
  metric: MetricItem;
  totalTasks: number;
}

export default function MetricCard({ metric, totalTasks }: Props) {
  return (
    <BlurView intensity={20} tint="light" className="mr-4 rounded-2xl bg-white/10">
      <View className="p-4 w-[160px]">
        <View className="flex-row justify-between items-center mb-3">
          <View className="h-10 w-10 rounded-full" style={{ backgroundColor: `${metric.color}30` }}>
            <View className="flex-1 items-center justify-center">
              <Ionicons name={metric.icon as any} size={20} color={metric.color} />
            </View>
          </View>
          <View className="h-8 w-8 rounded-lg bg-gray-200/50 items-center justify-center">
            <Text className="text-gray-900 font-bold">{metric.value}</Text>
          </View>
        </View>
        
        <Text className="text-gray-900 font-medium mb-1">{metric.label}</Text>
        <Text className="text-gray-500 text-xs">{metric.trend}</Text>

        <View className="mt-3 bg-gray-200/50 h-1 rounded-full overflow-hidden">
          <View 
            className="h-full rounded-full"
            style={{ 
              backgroundColor: metric.color,
              width: `${(metric.value / (totalTasks || 1)) * 100}%`
            }}
          />
        </View>
      </View>
    </BlurView>
  );
}
