import React from 'react';
import { Pressable, Image } from 'react-native';
import * as Haptics from 'expo-haptics';

export const ProfileButton: React.FC = () => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Add profile navigation logic here
  };

  return (
    <Pressable 
      onPress={handlePress}
      className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
      <Image
        source={{ uri: 'https://ui-avatars.com/api/?background=random' }}
        className="h-full w-full"
      />
    </Pressable>
  );
};
