import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

interface Props {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

export default function CategoryFilter({ activeCategory, onCategoryChange, categories }: Props) {
  return (
    <ScrollView 
      horizontal 
      className="px-4"
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => onCategoryChange(null)}
        className={`mr-4 px-6 h-12 rounded-2xl flex-row items-center justify-center ${
          !activeCategory ? 'bg-indigo-500' : 'bg-gray-200'
        }`}
      >
        <Text className="text-gray-900 font-medium">All</Text>
      </TouchableOpacity>
      
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryChange(category)}
          className={`mr-4 px-6 h-12 rounded-2xl flex-row items-center justify-center ${
            activeCategory === category ? 'bg-indigo-500' : 'bg-gray-200'
          }`}
        >
          <Text className="text-gray-900 font-medium capitalize">{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
