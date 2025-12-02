import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DB = require('../../DB.json');

// Assuming a mock current user. In a real app, this would come from your auth context.
const currentUsername = "Alex Johnson";

const ConversationScreen = () => {
  const router = useRouter();
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInfo, setChatInfo] = useState<any>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (chatId && DB.chats[chatId]) {
      const chatData = DB.chats[chatId];
      setChatInfo(chatData);

      const combinedMessages = [
        ...chatData.overall_conversation.buyer_messages.map((m: any) => ({ ...m, sender: chatData.buyer_username })),
        ...chatData.overall_conversation.seller_messages.map((m: any) => ({ ...m, sender: chatData.seller_username })),
      ];
      combinedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(combinedMessages);
    }
  }, [chatId]);

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage = { sender: currentUsername, message: inputText, timestamp: new Date().toISOString() };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const otherUser = chatInfo?.buyer_username === currentUsername ? chatInfo?.seller_username : chatInfo?.buyer_username;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row justify-center items-center p-4 border-b border-gray-200 bg-white">
        <Text className="text-lg font-bold">{otherUser || 'Chat'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="absolute right-4">
          <Ionicons name="close" size={24} color="#374151" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.timestamp}
          renderItem={({ item }) => (
            <View className={`max-w-[75%] rounded-2xl p-2.5 my-1 ${
              item.sender === currentUsername ? 'bg-green-500 self-end' : 'bg-white self-start border border-gray-200'
            }`}>
              <Text className={item.sender === currentUsername ? 'text-white' : 'text-black'}>
                {item.message}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
        />
        <View className="flex-row p-2.5 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 h-10 bg-gray-100 rounded-full px-4"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSend} className="ml-2.5 justify-center items-center">
            <Text className="text-green-500 font-bold text-base">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConversationScreen;