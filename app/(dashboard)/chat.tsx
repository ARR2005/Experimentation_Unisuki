import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const DB = require('../../DB.json')
const chats = Object.values(DB.chats || {}) as any[]

export default function Chat() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 96 }}>
      <View className="px-4 pt-6">
        <Text className="text-2xl font-bold mb-4">UniSuki</Text>

        {/* Search */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 12 }} />
          <View className="flex-1">
            <View className="h-3 bg-gray-200 rounded w-3/4" />
          </View>
        </View>

        {/* Chat list */}
        <View>
          {chats.map((it, idx) => (
            <TouchableOpacity key={idx} className="flex-row items-center py-3 border-b border-gray-100">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
                <Ionicons name="image-outline" size={20} color="#9CA3AF" />
              </View>

              <View className="flex-1">
                <Text className="font-medium">{it.username}</Text>
                <Text className="text-sm text-gray-500 mt-1">{it.recent_chat}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}