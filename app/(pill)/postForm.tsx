import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

// Mock image recognition function
const recognizeImage = () => {
  // In a real app, this would involve an API call to a service like Google Vision AI.
  // Here, we just return mock data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: 'UC JACKET (Black)',
        price: '800.00', // Suggests a price
        description: 'UC JACKET (Black) size L. Perfect for university use.',
        tags: ['jacket'],
      })
    }, 1500) // Simulate network delay
  })
}

export default function PostForm() {
  const params = useLocalSearchParams()
  const photo = typeof params.photo === 'string' ? params.photo : undefined
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagText, setTagText] = useState('')

  const addTag = () => {
    const t = tagText.trim().toLowerCase()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
    }
    setTagText('')
  }

  function publish() {
    // For now just log and go back
    console.log({ title, price, description, tags, photo })
    router.back()
  }

  useEffect(() => {
    if (photo) {
      setLoading(true)
      recognizeImage().then((mockData: any) => {
        setTitle(mockData.title)
        setPrice(mockData.price)
        setDescription(mockData.description)
        setTags(mockData.tags)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [photo])

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-xl font-bold mb-4">Create Listing</Text>

      <View className="mb-4">
        <View className="bg-gray-100 rounded-lg h-56 overflow-hidden items-center justify-center">
          {photo ? (
            <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          ) : (
            <View className="items-center justify-center">
              <Text className="text-gray-400">No photo</Text>
            </View>
          )}
        </View>
      </View>

      <Text className="text-sm text-gray-600">Product Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder={loading ? 'Analyzing image...' : 'Product Title'} className="border border-gray-200 rounded px-3 py-2 mb-3" editable={!loading} />

      <Text className="text-sm text-gray-600">Price</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder={loading ? 'Suggesting price...' : '₱ 0.00'} keyboardType="numeric" className="border border-gray-200 rounded px-3 py-2 mb-3" editable={!loading} />

      <Text className="text-sm text-gray-600">Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder={loading ? 'Generating description...' : 'Description'} multiline className="border border-gray-200 rounded px-3 py-2 mb-3 h-24" editable={!loading} />

      <Text className="text-sm text-gray-600">Tags</Text>
      <View className="border border-gray-200 rounded px-2 py-1 mb-6 flex-row flex-wrap items-center">
        {tags.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => setTags(tags.filter((t) => t !== tag))}
            className="bg-gray-200 rounded-full px-3 py-1 m-1 flex-row items-center"
          >
            <Text className="text-sm text-gray-800">{tag}</Text>
            <Text className="text-xs text-gray-600 ml-1">x</Text>
          </Pressable>
        ))}
        <TextInput
          value={tagText}
          onChangeText={setTagText}
          placeholder={tags.length === 0 ? 'Add tags...' : ''}
          onSubmitEditing={addTag}
          blurOnSubmit={false}
          className="flex-1 p-1"
          style={{ minWidth: 100 }}
          editable={!loading}
        />
      </View>

      <TouchableOpacity onPress={publish} className={`py-3 rounded items-center ${loading ? 'bg-gray-400' : 'bg-black'}`} disabled={loading}>
        <Text className="text-white font-medium">Publish Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
