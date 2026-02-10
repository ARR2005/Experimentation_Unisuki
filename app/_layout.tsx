import { PortalHost } from '@rn-primitives/portal'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'

import { AuthProvider, useAuth } from '@/context/auth'
import '../global.css'

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return

    const inApp = segments[0] === '(dashboard)'

    if (isAuthenticated && !inApp) {
      // if authenticated, go to dashboard
      router.replace('/(dashboard)/home' as any)
    } else if (isAuthenticated === false) {
      // if not authenticated, go to login
      router.replace('/(auth)/login' as any)
    }
  }, [isAuthenticated])

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen name="(pill)" />
        <Stack.Screen name="(onboarding)" />
      </Stack>
      <PortalHost />
    </>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

