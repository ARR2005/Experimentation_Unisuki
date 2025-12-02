import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import background from "../../assets/images/bg_white.png";
import Layout from '../../components/Layout';
import { carouselItems } from '../../constants/carouselItems';
import { categories } from '../../constants/category';
import { itemsMap, products } from '../../constants/product';
 // Taking first 5 products for the carousel

const { width } = Dimensions.get('window')

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<ScrollView | null>(null)
    const [selectedItem, setSelectedItem] = useState<any | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const router = useRouter();

    function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x
    const idx = Math.round(x / width)
    setActiveIndex(idx)
  }

  return (
    <>
      <Layout>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 96  }}>
            {/* Carousel */}
            <View className="mt-4">
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={44}
                ref={scrollRef}>
                {carouselItems.map((c: any, idx: number) => (
                  <View key={idx} style={{ width }} className="px-5">
                    <View className="bg-white rounded-md h-44 overflow-hidden">
                      {c.image_uri ? (
                        <Image source={{ uri: c.image_uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                      ) : (
                      null )}
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
              <View className="mt-2">
                <Text className="text-lg font-bold ml-6">Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10  }}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      className="items-center mr-4"
                      onPress={() => {
                        router.push({ pathname: '/(dashboard)/category', params: { category: cat.type, label: cat.label } } as any);
                      }}
                    >
                      <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center shadow">
                        <Ionicons name={cat.icon as any} size={24} className="text-black" />
                      </View>
                      <Text className="text-xs mt-1.5 text-black font-medium">{cat.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
  
              {/* Product grid */}
              <View className="flex-row flex-wrap p-2 rounded-md" style={{ marginHorizontal: -8 }}>
                {products.map((p) => (
                  <View key={p.id} className="w-1/2" style={{ paddingHorizontal: 6, marginBottom: 12 }}>
                    <View className="bg-white rounded-lg shadow-sm">
                      <View className="bg-gray-100 rounded-md overflow-hidden" style={{ aspectRatio: 1 }}>
                        {p.image_uri ? (
                          <Image source={{ uri: p.image_uri }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                          <View className="flex-1 items-center justify-center">
                            <Ionicons name="image-outline" size={36} className='bg-white' />
                          </View>
                        )}
                      </View>
  
                      <View className="mt-1">
                        <Text className="text-sm font-medium" numberOfLines={1}>{p.title}</Text>
                        <Text className="text-sm font-bold mt-1">₱ {p.price}</Text>
  
                        <View className="mt-2">
  
                          <TouchableOpacity
                            className="w-full bg-black px-3 py-2 rounded-md mb-2"
                            onPress={() => {
                              setSelectedItem(itemsMap[p.id]);
                              setModalVisible(true);
                            }}
                          >
                            <Text className="text-white text-xs text-center font-semibold">Check Item</Text>
                          </TouchableOpacity>
  
                          <TouchableOpacity
                            className="w-full border border-green -300 px-3 py-2 rounded-md"
                            onPress={() => {
                              router.push({ pathname: '/(pill)/buy', params: { itemId: p.id } } as any);
                            }}
                          >
                            <Text className="text-xs text-center font-semibold">Buy</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </ImageBackground>
      </Layout>

    {/* Item Details Modal */}
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-xl p-4" style={{ maxHeight: '80%' }}>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">{selectedItem?.title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView className="mt-3">
            {selectedItem?.image_uri ? (
              <Image source={{ uri: selectedItem.image_uri }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            ) : null}

            <Text className="mt-3 text-sm text-gray-700">{selectedItem?.description}</Text>

            {selectedItem?.support_images?.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
                {selectedItem.support_images.map((uri: string, i: number) => (
                  <Image key={i} source={{ uri }} style={{ width: 100, height: 100, marginRight: 8 }} resizeMode="cover" />
                ))}
              </ScrollView>
            ) : null}

            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-lg font-bold">₱ {selectedItem?.price}</Text>
              <View className="flex-row">
                <TouchableOpacity className="bg-green-600 px-4 py-2 rounded-md mr-2">
                  <Text className="text-white">Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-gray-300 px-4 py-2 rounded-md">
                  <Text>Message Seller</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
    </>
  )
}

export default Home;
