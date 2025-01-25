import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { format } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Task } from '../../types/task';
import TaskItem from '../../components/TaskItem';
import MetricCard from '../../components/MetricCard';
import CategoryFilter from '../../components/CategoryFilter';
import TaskModal from '../../components/TaskModal';

const mockTasks: Task[] = [
  { id: '1', title: 'Complete project presentation', category: 'work', dueTime: '2:30 PM', isCompleted: true },
  { id: '2', title: 'Grocery shopping', category: 'shopping', dueTime: '5:00 PM', isCompleted: false },
];

const categoryStyles = {
  work: {
    icon: (props: any) => <MaterialCommunityIcons name="briefcase-outline" {...props} />
  },
  personal: {
    icon: (props: any) => <Feather name="user" {...props} />
  },
  shopping: {
    icon: (props: any) => <AntDesign name="shoppingcart" {...props} />
  }
};

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pulseAnim = new Animated.Value(1);
  const today = format(new Date(), "MMMM d, yyyy");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const metrics = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: 'list',
      color: '#818cf8',
      trend: '+2 from yesterday'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: 'checkmark-circle',
      color: '#34d399',
      trend: '50% completion rate'
    },
    {
      label: 'In Progress',
      value: totalTasks - completedTasks,
      icon: 'time',
      color: '#f472b6',
      trend: '2 due today'
    }
  ];

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task
    ));
  };

  // Add pulsing animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 flex-row justify-between items-center">
        <View>
          <Text className="text-3xl font-bold text-gray-900">Tasks</Text>
          <Text className="text-gray-500 mt-1">{today}</Text>
        </View>
      </View>

      {/* Enhanced Stats */}
      <View className="h-[140px] mt-6">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} totalTasks={totalTasks} />
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View className="h-12">
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={Object.keys(categoryStyles)}
        />
      </View>

      {/* Today's Focus */}
      <View className="mt-4 px-4">
        <Text className="text-xl font-semibold text-gray-900 mb-3">
          Today's Focus
        </Text>
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl p-4 overflow-hidden"
        >
          <View className="absolute inset-0 bg-indigo-500/10" />
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-gray-900 text-lg font-semibold">
                {totalTasks} tasks today
              </Text>
              <Text className="text-gray-500 mt-1">
                {completedTasks} completed
              </Text>
            </View>
            <BlurView
              intensity={30}
              tint="light"
              className="w-12 rounded-xl items-center justify-center"
            >
              <View className="items-center justify-center">
                <Text className="text-gray-900 font-bold text-lg">
                  {completionRate}%
                </Text>
              </View>
            </BlurView>
          </View>
          
          <View className="bg-gray-200/50 h-2 rounded-full overflow-hidden">
            <View 
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </View>
        </BlurView>
      </View>

      {/* Task List */}
      <ScrollView className="flex-1 mt-6 px-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        className="absolute bottom-28 right-4"  // changed from bottom-24
        onPress={() => setIsModalVisible(true)}
      >
        <BlurView
          intensity={10}  // increased from 30
          tint="light"
          className="h-14 w-14 rounded-full items-center justify-center"
        >
          <View className="absolute inset-0 rounded-full bg-indigo-500/80" /> {/* increased opacity from /50 to /80 */}
          <AntDesign name="plus" size={24} color="white" />
        </BlurView>
      </TouchableOpacity>

      <TaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={() => {}}
      />
    </SafeAreaView>
  );
};

export default Home;