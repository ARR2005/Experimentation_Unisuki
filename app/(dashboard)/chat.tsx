import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const items = Array.from({ length: 6 }).map((_, i) => ({ id: `u${i}`, name: `Contact ${i + 1}`, last: 'Last message preview goes here' }))

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
          {items.map((it) => (
            <TouchableOpacity key={it.id} className="flex-row items-center py-3 border-b border-gray-100">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
                <Ionicons name="image-outline" size={20} color="#9CA3AF" />
              </View>
                
              <View className="flex-1">
                <Text className="font-medium">{it.name}</Text>
                <View className="h-3 bg-gray-200 rounded mt-2 w-3/4" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}