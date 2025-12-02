import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Layout';

// Assuming a mock current user. In a real app, this would come from your auth context.
const currentUsername = "Alex Johnson"; 

const DB = require('../../DB.json');
const chats = Object.entries(DB.chats || {}).map(([key, v]: any) => ({ id: key, ...v }));

const ChatListScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => {
    // Determine the other user in the chat
    const otherUser = item.buyer_username === currentUsername ? item.seller_username : item.buyer_username;

    return (
      <TouchableOpacity
        className="flex-row items-center p-4 border-b border-gray-100"
        onPress={() => router.push({ pathname: '/(pill)/conversation', params: { chatId: item.id } } as any)}
      >
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${otherUser}` }} // Using a placeholder avatar
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">{otherUser}</Text>
          <Text className="text-sm text-gray-600 mt-0.5" numberOfLines={1}>{item.recent_chat}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-white">
        <Text className="text-2xl font-bold px-4 py-2.5 text-black">Chats</Text>
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 96 }}
        />
      </View>
    </Layout>
  );
};

export default ChatListScreen;