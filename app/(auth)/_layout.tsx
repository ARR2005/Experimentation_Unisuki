import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const authlayout = () => {
  return (
    <>
        <StatusBar style='auto' />
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            <Stack.Screen name="signup"/>
        </Stack>
    </>
  )
}

export default authlayout