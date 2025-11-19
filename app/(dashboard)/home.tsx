import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

const { width } = Dimensions.get('window')

const carouselItems = [
  { id: 'c1' },
  { id: 'c2' },
  { id: 'c3' },
]

const categories = [
  { id: 'cat1', label: 'Shoes', icon: 'walk' },
  { id: 'cat2', label: 'Gadgets', icon: 'hardware-chip' },
  { id: 'cat3', label: 'Clothing', icon: 'shirt' },
  { id: 'cat4', label: 'Books', icon: 'book' },
  { id: 'cat5', label: 'Medical', icon: 'medkit' },
]

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: `p${i}`,
  title: `Product ${i + 1}`,
  price: `${(i + 1) * 5}`,
}))

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<ScrollView | null>(null)

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x
    const idx = Math.round(x / width)
    setActiveIndex(idx)
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 96 }}>
      <View className="px-4 pt-6">
        <Text className="text-2xl font-bold mb-4">UniSuki</Text>

        {/* Carousel */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            ref={scrollRef}
          >
            {carouselItems.map((c) => (
              <View key={c.id} style={{ width }} className="px-4">
                <View className="bg-gray-200 rounded-xl h-44 items-center justify-center">
                  <Ionicons name="image-outline" size={42} color="#9CA3AF" />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Dots */}
          <View className="flex-row items-center justify-center mt-3">
            {carouselItems.map((_, i) => (
              <View
                key={i}
                className={`mx-1 ${i === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                style={{ width: i === activeIndex ? 8 : 6, height: 6, borderRadius: 3 }}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View className="mt-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {categories.map((cat) => (
              <View key={cat.id} className="items-center mr-4">
                <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center">
                  <Ionicons name={cat.icon as any} size={20} color="#374151" />
                </View>
                <Text className="text-xs mt-2 text-gray-600">{cat.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Product grid */}
        <View className="mt-6 flex-row flex-wrap justify-between">
          {products.map((p) => (
            <View key={p.id} className="w-[48%] mb-4">
              <View className="bg-gray-100 rounded-lg h-40 items-center justify-center">
                <Ionicons name="image-outline" size={36} color="#9CA3AF" />
              </View>

              <View className="mt-3">
                <Text className="text-sm font-medium">{p.title}</Text>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-sm font-bold">₱ {p.price}</Text>
                  <TouchableOpacity className="bg-black px-3 py-1 rounded-md">
                    <Text className="text-white text-xs">ADD TO BAG</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}