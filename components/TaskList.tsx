import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTaskContext } from '../contexts/TaskContext';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  dueDate: Date;
}

export const TaskList = ({ category = 'All' }) => {
  const { tasks, toggleTask, deleteTask } = useTaskContext();

  const filteredTasks = tasks.filter(task => 
    category === 'All' ? true : task.category === category
  );

  const handleComplete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTask(id);
  };

  const renderTask = ({ item, index }: { item: Task; index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)}
      exiting={FadeOutUp}>
      <Swipeable
        renderRightActions={() => (
          <View className="flex-row">
            <Pressable className="bg-yellow-500 justify-center px-4">
              <Text className="text-white">Edit</Text>
            </Pressable>
            <Pressable className="bg-red-500 justify-center px-4">
              <Text className="text-white">Delete</Text>
            </Pressable>
          </View>
        )}>
        <Pressable 
          onPress={() => handleComplete(item.id)}
          className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-lg flex-row items-center">
          <Pressable 
            className={`h-6 w-6 rounded-full border-2 mr-3 ${
              item.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
            }`}
          />
          <Text className={`flex-1 ${item.completed ? 'text-gray-400 line-through' : ''}`}>
            {item.title}
          </Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );

  return (
    <Animated.FlatList
      className="flex-1 px-6"
      data={filteredTasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
