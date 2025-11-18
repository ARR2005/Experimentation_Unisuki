import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signup = () => {
  return (
    <View>
        <Text>signup</Text>
        <Link href="/">SIGN UP</Link>
        <View>
            <Text>Sign IN</Text>
            <Link href="/Signup">Here</Link>
        </View>
    </View>
  )
}

export default signup

const styles = StyleSheet.create({})