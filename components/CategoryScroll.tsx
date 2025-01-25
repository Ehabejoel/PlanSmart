import React, { useState } from 'react';
import { ScrollView, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'Finance'];

export const CategoryScroll = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryPress = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveCategory(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-6 px-6">
      {categories.map((category) => (
        <Pressable
          key={category}
          onPress={() => handleCategoryPress(category)}
          className={`mr-3 px-6 h-10 rounded-full items-center justify-center ${
            activeCategory === category 
              ? 'bg-blue-500' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}>
          <Text className={
            activeCategory === category 
              ? 'text-white' 
              : 'text-gray-900 dark:text-white'
          }>
            {category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
