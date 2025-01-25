import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTaskContext } from '../contexts/TaskContext';

export const AddTaskSheet = ({ bottomSheetRef }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addTask } = useTaskContext();

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    
    addTask({
      title: taskTitle,
      completed: false,
      category: 'All',
      dueDate: selectedDate,
      priority: selectedPriority
    });

    setTaskTitle('');
    bottomSheetRef.current?.close();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const snapPoints = ['40%', '90%'];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      className="bg-white dark:bg-gray-900">
      <View className="flex-1 px-6">
        <TextInput
          className="text-xl pb-2 border-b border-gray-200 dark:border-gray-700"
          placeholder="What needs to be done?"
          placeholderTextColor="#666"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        
        <View className="flex-row flex-wrap gap-2 mt-4">
          <Pressable className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Text>Today</Text>
          </Pressable>
          <Pressable className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Text>Tomorrow</Text>
          </Pressable>
          <Pressable className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Text>Pick date</Text>
          </Pressable>
        </View>

        <View className="mt-6">
          <Text className="text-gray-600 dark:text-gray-400 mb-2">Priority</Text>
          <View className="flex-row gap-2">
            {['Low', 'Medium', 'High'].map((priority) => (
              <Pressable 
                key={priority}
                className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg items-center">
                <Text>{priority}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable 
          className="bg-blue-500 py-3 rounded-lg items-center mt-6"
          onPress={handleAddTask}>
          <Text className="text-white font-semibold">Add Task</Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
};
