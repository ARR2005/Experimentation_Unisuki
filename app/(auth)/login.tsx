import { SignInForm } from '@/components/sign-in-form';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

const SignIn = () => {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center">
        <Image source={require('../../assets/icons/Splash_Logo.png')} className="absolute top-[-300] w-64 h-64 justify-center" resizeMode="contain" />
        <SignInForm />
      </View>
    </ScrollView>
  );
};

export default SignIn;