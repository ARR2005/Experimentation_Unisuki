import { SignInForm } from '@/components/sign-in-form';
import React from 'react';
import { ScrollView, View } from 'react-native';

const Login = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-end p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive">
      <View className="w-full max-w-sm mt-[350px]">
        <SignInForm />
      </View>
    </ScrollView>
  )
}

export default Login

