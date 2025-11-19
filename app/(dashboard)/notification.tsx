import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const DB = require('../../DB.json')
const items = Object.entries(DB.notifications || {}).map(([key, v]: any) => ({ id: key, ...v }))

export default function Notification() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 96 }}>
      <View className="px-4 pt-6">
        <Text className="text-2xl font-bold mb-4">UniSuki</Text>

        {/* top segmented control */}
        <View className="text-9xl flex-row items-center space-x-3 bg-transparent mb-6">
            <Text className="text-2xl font-bold text-black">NOTIFICATION</Text>
        </View>

        {/* notifications list */}
        <View className="bg-white rounded-lg">
          {items.map((it) => (
            <TouchableOpacity key={it.id} className="flex-row items-start py-4 px-1 border-b border-gray-100">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Ionicons name="image-outline" size={20} color="#9CA3AF" />
              </View>

              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-2">{it.type}</Text>
                <Text className="text-sm font-semibold">{it.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
