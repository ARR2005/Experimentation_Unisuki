import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SafeAreaProvider className='flex-1 bg-white'>
      <View className='flex-1'>
        <Header />
        <View className='flex-1 border border-green-600'>{children}</View>
      </View>
    </SafeAreaProvider>
  );
};



export default Layout;
