import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';

interface Task {
  id: string;
  title: string;
  time: string;
  category: 'work' | 'personal';
}

interface TasksByDate {
  [date: string]: Task[];
}

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

interface CalendarDay {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const initialTasks: TasksByDate = {
  '2025-01-23': [
    { id: '1', title: 'Team Standup', time: '09:00 AM', category: 'work' },
    { id: '2', title: 'Client Meeting', time: '11:30 AM', category: 'work' },
    { id: '3', title: 'Code Review', time: '2:00 PM', category: 'work' },
  ],
  '2025-01-27': [
    { id: '4', title: 'Dentist Appointment', time: '10:00 AM', category: 'personal' },
  ],
  '2025-02-03': [
    { id: '5', title: 'Grocery Shopping', time: '4:00 PM', category: 'personal' },
    { id: '6', title: 'Gym Session', time: '6:00 PM', category: 'personal' },
  ],
  '2025-02-28': [
    { id: '7', title: 'Project Deadline', time: '5:00 PM', category: 'work' },
  ],
  '2025-01-25': [
    { id: '8', title: 'Team Lunch', time: '12:30 PM', category: 'work' },
    { id: '9', title: 'Sprint Planning', time: '2:00 PM', category: 'work' },
  ],
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<TasksByDate>(initialTasks);

  const markedDates = useCallback((): MarkedDates => {
    const marked: MarkedDates = {};
    Object.keys(tasks).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: tasks[date][0].category === 'work' ? '#818cf8' : '#34d399'
      };
    });
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: '#818cf8'
    };
    return marked;
  }, [selectedDate, tasks]);

  const selectedTasks = tasks[selectedDate] || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Calendar</Text>
      </View>

      <View className="mx-4 rounded-2xl overflow-hidden mb-4 bg-white shadow-sm">
        <Calendar
          markedDates={markedDates()}
          onDayPress={(day: CalendarDay) => setSelectedDate(day.dateString)}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#1f2937',
            selectedDayBackgroundColor: '#818cf8',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#818cf8',
            dayTextColor: '#1f2937',
            textDisabledColor: '#d1d5db',
            dotColor: '#818cf8',
            monthTextColor: '#1f2937',
            arrowColor: '#818cf8',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14
          }}
        />
      </View>

      <View className="px-6 flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold text-gray-900">
            {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}
          </Text>
          <Text className="text-sm text-gray-500">
            {selectedTasks.length} tasks
          </Text>
        </View>

        <ScrollView className="flex-1">
          {selectedTasks.length > 0 ? (
            selectedTasks.map(task => (
              <BlurView key={task.id} intensity={20} tint="light" className="mb-3 p-4 rounded-2xl">
                <View className="flex-row items-center">
                  <View className={`h-3 w-3 rounded-full mr-3 ${
                    task.category === 'work' ? 'bg-indigo-500' : 'bg-emerald-500'
                  }`} />
                  <View className="flex-1">
                    <Text className="text-base text-gray-900">{task.title}</Text>
                    <Text className="text-sm text-gray-500">{task.time}</Text>
                  </View>
                </View>
              </BlurView>
            ))
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500">No tasks for this day</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
