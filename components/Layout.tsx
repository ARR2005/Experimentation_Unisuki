import React from 'react';
import { View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';

  return (
    <SafeAreaProvider className={`flex-1 ${bgColor}`}>
      <View className={`flex-1 ${bgColor}`}>
        <Header />
        <View className='flex-1'>{children}</View>
      </View>
    </SafeAreaProvider>
  );
};

export default Layout;
