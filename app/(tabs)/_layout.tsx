import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TaskProvider } from '@/contexts/TaskContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TaskProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 84 : 64,
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0,
          },
          tabBarBackground: () => (
            <BlurView intensity={80} tint="light" style={{ flex: 1 }} />
          ),
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
        tabBarOptions={{
          onPress: handleTabPress,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist" color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar" color={color} />,
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
