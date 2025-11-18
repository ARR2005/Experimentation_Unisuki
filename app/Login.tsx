import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const login = () => {
  return (
    <View>
      <Text>LOGIN</Text>
      <View>
        <Text>Sign up</Text>
        <Link href="/Signup">Here</Link>
      </View>
      
    </View>
  )
}

export default login

const styles = StyleSheet.create({})