import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Task } from '../types/task';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <BlurView intensity={20} tint="light" className="mb-3 p-4 rounded-2xl overflow-hidden">
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        className="flex-row items-center"
      >
        <View className={`h-3 w-3 rounded-full mr-3 ${
          task.category === 'work' ? 'bg-indigo-500' :
          task.category === 'shopping' ? 'bg-emerald-500' : 'bg-purple-500'
        }`} />
        <View className="flex-1">
          <Text className={`text-base ${
            task.isCompleted 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
          }`}>
            {task.title}
          </Text>
          {task.dueTime && (
            <Text className="text-sm text-gray-500 mt-1">
              Due {task.dueTime}
            </Text>
          )}
        </View>
        <View className={`h-6 w-6 rounded-full border-2 ${
          task.isCompleted 
            ? 'bg-emerald-500 border-emerald-500' 
            : 'border-gray-600'
        }`}>
          {task.isCompleted && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white">✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </BlurView>
  );
}
