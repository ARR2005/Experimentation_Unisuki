import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import "../global.css";

const mainlayout = () => {
  return (
    <>
      <StatusBar style = 'auto' />
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(dashboard)"/>
      </Stack>
      <PortalHost />
    </>
  );
};

export default mainlayout;

const style = StyleSheet.create({})