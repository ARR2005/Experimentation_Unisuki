import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header: React.FC = () => {
  return (
    <View className='h-20 justify-center items-start px-6 mt-4'>
      <Image source={require('../assets/icons/Logo.png')}  className='w-36 h-32' />
    </View>
  );
};


export default Header;