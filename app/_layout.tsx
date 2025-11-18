import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FadeIn } from 'react-native-reanimated'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <StatusBar />
        <Stack screenOptions={{ 
          headerShown: false,
          animation: "fade", 
        }}>
      <Stack.Screen name="index" options={{ presentation: 'card' }} />
      <Stack.Screen name="login" options={{ presentation: 'card' }} />
    </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})
