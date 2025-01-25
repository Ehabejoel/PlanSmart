import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: { title: string; category: string; dueTime?: string }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dueTime, setDueTime] = useState<Date | null>(null);

  const categories = ['work', 'personal', 'shopping'];

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      category,
      dueTime: dueTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    setTitle('');
    setCategory('work');
    setDueTime(null);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                New Task
              </Text>
              
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="What needs to be done?"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-gray-900 dark:text-white mb-4"
              />

              <Text className="text-gray-600 dark:text-gray-300 mb-2">Category</Text>
              <View className="flex-row mb-4">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    className={`mr-2 px-4 py-2 rounded-full ${
                      category === cat ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text className={`capitalize ${
                      category === cat ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-6"
              >
                <Text className="text-gray-600 dark:text-gray-300">
                  {dueTime ? dueTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Set due time'}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={dueTime || new Date()}
                  mode="time"
                  is24Hour={false}
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(false);
                    if (selectedDate) setDueTime(selectedDate);
                  }}
                />
              )}

              <View className="flex-row space-x-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 p-4 rounded-xl bg-gray-200 dark:bg-gray-700"
                >
                  <Text className="text-center text-gray-600 dark:text-gray-300">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="flex-1 p-4 rounded-xl bg-blue-500"
                >
                  <Text className="text-center text-white font-medium">Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TaskModal;
