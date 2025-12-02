import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Layout from '../../components/Layout'

const DB = require('../../DB.json')
const items = Object.entries(
  DB.notifications || {}).map(([key, v]: 
    any) => 
      ({ id: key, ...v })
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
export default function Notification() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);

  const handleNotificationPress = (item: any) => {
    const itemType = item.type?.toLowerCase();
    if ((itemType === 'post created' || itemType === 'purchase') && item.description) {
      setSelectedNotification(item);
      setModalVisible(true);
    }
    // You can add other actions for other notification types here
  };

  return (
    <>
      <Layout>
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 96 }}>
          <Text className="text-2xl font-bold text-black mb-6">Notifications</Text>

          {/* notifications list */}
          <View>
            {items.map((it) => (
              <TouchableOpacity key={it.id} className="py-4 px-1 border-b border-gray-100" onPress={() => handleNotificationPress(it)}>
                <View className="flex-1">
                  <Text className="text-base font-semibold mb-1">{it.message}</Text>
                  <Text className="text-xs text-gray-500">{new Date(it.timestamp).toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Layout>

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40 justify-center items-center px-4">
          <View className="bg-white rounded-xl p-5 w-full" style={{ maxHeight: '60%' }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">{selectedNotification?.type}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-base font-medium mb-2">{selectedNotification?.message}</Text>
              <Text className="text-sm text-gray-600 leading-relaxed">{selectedNotification?.description}</Text>
              <Text className="text-xs text-gray-400 mt-4 text-right">
                {selectedNotification?.timestamp ? new Date(selectedNotification.timestamp).toLocaleString() : ''}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}
