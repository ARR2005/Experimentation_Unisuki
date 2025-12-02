import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-8">
      <Image
        source={require('../../assets/icons/Splash_Logo.png')}
        className="w-64 h-64"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-center mt-8">Welcome to Unisuk</Text>
      <Text className="text-lg text-center text-gray-600 mt-4">
        Your one-stop shop for everything you need.
      </Text>
      <Button className="w-full mt-8 bg-green-500" onPress={() => router.push('/(dashboard)/home')}>
        <Text>Get Started</Text>
      </Button>
    </View>
  );
};

export default OnboardingScreen;
