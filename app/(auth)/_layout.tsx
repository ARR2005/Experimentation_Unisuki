import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const authlayout = () => {
  return (
    <>
        <StatusBar style='auto' />
        <Stack 
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="signup"/>
        </Stack>
    </>
  )
}

export default authlayout