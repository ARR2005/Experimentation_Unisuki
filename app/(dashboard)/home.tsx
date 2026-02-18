import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";
import background from "../../assets/images/bg_white.png";
import Layout from "../../components/Layout";
import { carouselItems } from "../../constants/carouselItems";
import { itemsMap, products } from "../../constants/product";
import { THEME } from "../../lib/theme";

const { width } = Dimensions.get("window");

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [mode, setMode] = useState<"buyer" | "seller">("buyer");
  const [checkModalVisible, setCheckModalVisible] = useState(false);
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<string | null>(
    null,
  );

  const DB = require("DB.json");
  const items = useMemo(() => Object.values(DB.items || {}), []);
  const types = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .map((i: any) => (i.type === "gadgets" ? "others" : i.type))
            .filter(Boolean),
        ),
      ),
    [items],
  );
  const sizes = useMemo(() => {
    const sizeOrder = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
    return Array.from(
      new Set(items.map((i: any) => i.size).filter(Boolean)),
    ).sort((a, b) => {
      const aIndex = sizeOrder.indexOf(a.toLowerCase());
      const bIndex = sizeOrder.indexOf(b.toLowerCase());
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [items]);

  const bookGenres = [
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Textbook",
    "Classic",
  ];
  const shoeSizes = ["7", "8", "9", "10", "11", "12"];

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedShoeSize, setSelectedShoeSize] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  function onScroll(e: any) {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    setActiveIndex(idx);
  }

  function checkProduct() {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((it: any) => {
      const itemType = it.type === "gadgets" ? "others" : it.type;
      if (q && !it.title.toLowerCase().includes(q)) return false;
      if (selectedType && itemType !== selectedType) return false;
      if (selectedSize && it.size !== selectedSize) return false;
      return true;
    });
    setResults(filtered);
  }

  return (
    <>
      <Layout>
        <ImageBackground
          source={background}
          style={{
            flex: 1,
            backgroundColor: isDark ? THEME.dark.background : undefined,
          }}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 96 }}
          >
            {/* Carousel */}
            <View className="mt-4 mb-2">
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={44}
                ref={scrollRef}
              >
                {carouselItems.map((c: any, idx: number) => (
                  <View key={idx} style={{ width }} className="px-5">
                    <View
                      className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl h-48 overflow-hidden shadow-md ${
                        isDark
                          ? "border border-gray-700"
                          : "border border-gray-100"
                      }`}
                    >
                      {c.image_uri ? (
                        <Image
                          source={{ uri: c.image_uri }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          className={`flex-1 ${isDark ? "bg-gray-700" : "bg-gray-200"} items-center justify-center`}
                        >
                          <Ionicons
                            name="image-outline"
                            size={48}
                            color={isDark ? "#6B7280" : "#D1D5DB"}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View className="flex-row items-center justify-center mt-4">
                {carouselItems.map((_, i) => (
                  <View
                    key={i}
                    className={`mx-1.5 ${i === activeIndex ? (isDark ? "bg-white" : "bg-gray-900") : isDark ? "bg-gray-700" : "bg-gray-300"}`}
                    style={{
                      width: i === activeIndex ? 10 : 6,
                      height: 6,
                      borderRadius: 3,
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Mode toggle */}
            <View className="px-4">
              <View className="flex-row items-center justify-center mt-2 mb-4">
                <TouchableOpacity
                  onPress={() => setMode("buyer")}
                  className={`px-4 py-2 rounded-l-full ${mode === "buyer" ? "bg-gray-900" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${mode === "buyer" ? "text-white" : "text-gray-700"}`}
                  >
                    Buyer
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMode("seller")}
                  className={`px-4 py-2 rounded-r-full ${mode === "seller" ? "bg-gray-900" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${mode === "seller" ? "text-white" : "text-gray-700"}`}
                  >
                    Seller
                  </Text>
                </TouchableOpacity>
              </View>

              {mode === "buyer" ? (
                <>
                  {/* Categories (derived from product types) */}
                  <View className="mt-2 mb-6">
                    <Text
                      className={`text-lg font-bold ml-1 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Categories
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingHorizontal: 16 }}
                    >
                      {types.map((tag) => (
                        <TouchableOpacity
                          key={tag}
                          className="items-center mr-4"
                          onPress={() =>
                            setSelectedCategoryTag(
                              selectedCategoryTag === tag ? null : tag,
                            )
                          }
                        >
                          <View
                            className={`w-16 h-16 rounded-full items-center justify-center shadow-md ${selectedCategoryTag === tag ? "bg-green-600" : isDark ? "bg-gray-800" : "bg-white"}`}
                          >
                            <Ionicons
                              name="cube-outline"
                              size={24}
                              color={
                                selectedCategoryTag === tag
                                  ? "#fff"
                                  : isDark
                                    ? "#fff"
                                    : "#000"
                              }
                            />
                          </View>
                          <Text
                            className={`text-xs mt-2 capitalize ${selectedCategoryTag === tag ? "font-bold text-green-600" : isDark ? "text-gray-300" : "text-gray-800"}`}
                          >
                            {tag}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Product grid + check trigger (buyer = original card grid) */}
                  <View className="px-3 pb-6">
                    <TouchableOpacity
                      onPress={() => setCheckModalVisible(true)}
                      className="bg-white border border-gray-200 rounded py-3 px-4 mb-4 mx-2 items-center"
                    >
                      <Text className="text-gray-800 font-medium">
                        Find Product (Advanced Search)
                      </Text>
                    </TouchableOpacity>

                    <Text
                      className={`text-lg font-bold mb-4 ml-2 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Available Items
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                      {products
                        .filter(
                          (p) =>
                            !selectedCategoryTag ||
                            itemsMap[p.id]?.type === selectedCategoryTag,
                        )
                        .map((p) => (
                          <View
                            key={p.id}
                            className="flex-1 min-w-[45%] max-w-[48%]"
                          >
                            <View
                              className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg overflow-hidden shadow-sm ${isDark ? "border border-gray-700" : "border border-gray-100"}`}
                            >
                              <View
                                className={
                                  isDark ? "bg-gray-700" : "bg-gray-100"
                                }
                                style={{ aspectRatio: 1 }}
                              >
                                {p.image_uri ? (
                                  <Image
                                    source={{ uri: p.image_uri }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                  />
                                ) : (
                                  <View
                                    className={`flex-1 items-center justify-center ${isDark ? "bg-gray-600" : "bg-gray-200"}`}
                                  >
                                    <Ionicons
                                      name="image-outline"
                                      size={40}
                                      color={isDark ? "#9CA3AF" : "#9CA3AF"}
                                    />
                                  </View>
                                )}
                              </View>

                              <View className="p-3">
                                <Text
                                  className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                                  numberOfLines={2}
                                >
                                  {p.title}
                                </Text>
                                <Text
                                  className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"} mt-2`}
                                >
                                  ₱{p.price}
                                </Text>

                                <View className="mt-3 gap-2">
                                  <TouchableOpacity
                                    className={`w-full ${isDark ? "bg-green-500" : "bg-gray-900"} px-3 py-2.5 rounded-lg ${isDark ? "active:bg-green-600" : "active:bg-gray-800"}`}
                                    onPress={() => {
                                      setSelectedItem(itemsMap[p.id]);
                                      setModalVisible(true);
                                    }}
                                  >
                                    <Text className="text-white text-xs text-center font-semibold">
                                      View Details
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    className={`w-full ${isDark ? "border border-gray-600" : "border border-gray-300"} px-3 py-2.5 rounded-lg ${isDark ? "active:bg-gray-700" : "active:bg-gray-50"}`}
                                    onPress={() =>
                                      router.push({
                                        pathname: "/(pill)/buy",
                                        params: { itemId: p.id },
                                      } as any)
                                    }
                                  >
                                    <Text
                                      className={`${isDark ? "text-white" : "text-gray-900"} text-xs text-center font-semibold`}
                                    >
                                      Purchase
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
                </>
              ) : (
                <View className="px-5 py-4">
                  <Text
                    className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Seller — Products to List
                  </Text>
                  <View className="space-y-4">
                    {products.map((p) => (
                      <View
                        key={p.id}
                        className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg overflow-hidden border ${isDark ? "border-gray-700" : "border-gray-100"}`}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{ width: 140, height: 140 }}
                            className={`${isDark ? "bg-gray-700" : "bg-gray-100"} overflow-hidden`}
                          >
                            {p.image_uri ? (
                              <Image
                                source={{ uri: p.image_uri }}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                              />
                            ) : (
                              <View className="flex-1 items-center justify-center">
                                <Ionicons
                                  name="image-outline"
                                  size={40}
                                  color={isDark ? "#9CA3AF" : "#9CA3AF"}
                                />
                              </View>
                            )}
                          </View>
                          <View className="p-4 flex-1">
                            <Text
                              className={`${isDark ? "text-white" : "text-gray-900"} font-semibold text-lg`}
                            >
                              {p.title}
                            </Text>
                            <Text
                              className={`${isDark ? "text-gray-300" : "text-gray-700"} mt-2`}
                            >
                              ₱{p.price}
                            </Text>
                            {p.description ? (
                              <Text
                                className={`${isDark ? "text-gray-300" : "text-gray-700"} mt-2`}
                                numberOfLines={2}
                              >
                                {p.description}
                              </Text>
                            ) : null}
                            <View className="flex-row mt-3">
                              <TouchableOpacity
                                className={`mr-3 ${isDark ? "bg-green-500" : "bg-gray-900"} px-4 py-2 rounded-lg`}
                              >
                                <Text className="text-white font-semibold">
                                  List for Sale
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                className={`border ${isDark ? "border-gray-600" : "border-gray-300"} px-4 py-2 rounded-lg`}
                                onPress={() => {
                                  setSelectedItem(itemsMap[p.id]);
                                  setModalVisible(true);
                                }}
                              >
                                <Text
                                  className={`${isDark ? "text-white" : "text-gray-900"} font-semibold`}
                                >
                                  View
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </Layout>

      {/* Check Product Modal */}
      <Modal
        visible={checkModalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text className="text-xl font-bold mb-4">Find Product</Text>

            <TextInput
              placeholder="EX. NSTP Shirt, Pe shirt"
              value={query}
              onChangeText={setQuery}
              className="border border-gray-200 rounded px-3 py-2 bg-white mb-4"
            />

            <Text className="text-sm text-gray-600 mb-2">Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8, marginBottom: 4 }}
            >
              {types.map((type: string) => (
                <TouchableOpacity
                  key={type}
                  onPress={() =>
                    setSelectedType(selectedType === type ? null : type)
                  }
                  className="items-center mr-4"
                >
                  <View
                    className={`w-16 h-16 rounded-2xl items-center justify-center ${selectedType === type ? "bg-green-600" : "bg-gray-100"}`}
                  >
                    <Ionicons
                      name={"cube-outline"}
                      size={28}
                      color={selectedType === type ? "white" : "black"}
                    />
                  </View>
                  <Text
                    className={`text-xs mt-2 capitalize ${selectedType === type ? "font-bold text-green-700" : "text-gray-600"}`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedType === "clothes" && (
              <>
                <Text className="text-sm text-gray-600 mb-2">Size</Text>
                <View className="flex-row flex-wrap mb-4">
                  {sizes.length ? (
                    sizes.map((s: string) => (
                      <TouchableOpacity
                        key={s}
                        onPress={() =>
                          setSelectedSize((c) => (c === s ? null : s))
                        }
                        className={`mr-2 mb-2 px-3 py-2 rounded-full ${selectedSize === s ? "bg-gray-800" : "bg-gray-100"}`}
                      >
                        <Text
                          className={`uppercase ${selectedSize === s ? "text-white" : "text-gray-700"}`}
                        >
                          {s}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-sm text-gray-500">
                      No sizes available
                    </Text>
                  )}
                </View>
              </>
            )}

            {selectedType === "books" && (
              <>
                <Text className="text-sm text-gray-600 mb-2">Genre</Text>
                <View className="flex-row flex-wrap mb-4">
                  {bookGenres.map((genre: string) => (
                    <TouchableOpacity
                      key={genre}
                      onPress={() =>
                        setSelectedGenre((g) => (g === genre ? null : genre))
                      }
                      className={`mr-2 mb-2 px-3 py-2 rounded-full ${selectedGenre === genre ? "bg-gray-800" : "bg-gray-100"}`}
                    >
                      <Text
                        className={`${selectedGenre === genre ? "text-white" : "text-gray-700"}`}
                      >
                        {genre}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {selectedType === "shoes" && (
              <>
                <Text className="text-sm text-gray-600 mb-2">Size (US)</Text>
                <View className="flex-row flex-wrap mb-4">
                  {shoeSizes.map((size: string) => (
                    <TouchableOpacity
                      key={size}
                      onPress={() =>
                        setSelectedShoeSize((s) => (s === size ? null : s))
                      }
                      className={`mr-2 mb-2 px-3 py-2 rounded-full ${selectedShoeSize === size ? "bg-gray-800" : "bg-gray-100"}`}
                    >
                      <Text
                        className={`${selectedShoeSize === size ? "text-white" : "text-gray-700"}`}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => {
                  checkProduct();
                }}
                className="bg-black rounded py-3 px-4 items-center flex-1"
              >
                <Text className="text-white font-medium">Check Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCheckModalVisible(false)}
                className="border rounded py-3 px-4 items-center flex-1"
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-semibold my-4">
              Results ({results.length})
            </Text>
            <View>
              {results.map((r: any) => (
                <View key={r.title} className="flex-row items-center mb-4">
                  <View className="w-16 h-16 bg-gray-100 rounded mr-3 overflow-hidden">
                    {r.image_uri ? (
                      <Image
                        source={{ uri: r.image_uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="flex-1 items-center justify-center">
                        <Text className="text-gray-400">No image</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="font-medium">{r.title}</Text>
                    <Text className="text-sm text-gray-600">₱ {r.price}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ height: 64 }} />
          </ScrollView>
        </View>
      </Modal>

      {/* Item Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View
            className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-t-2xl p-6`}
            style={{ maxHeight: "85%" }}
          >
            <View className="flex-row justify-between items-start mb-4">
              <Text
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} flex-1 mr-4`}
              >
                {selectedItem?.title}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-2"
              >
                <Ionicons
                  name="close"
                  size={26}
                  color={isDark ? "#9CA3AF" : "#6B7280"}
                />
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
              {selectedItem?.image_uri ? (
                <Image
                  source={{ uri: selectedItem.image_uri }}
                  style={{ width: "100%", height: 240 }}
                  resizeMode="cover"
                  className="rounded-lg mb-4"
                />
              ) : null}

              <Text
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-4`}
              >
                {selectedItem?.description}
              </Text>

              {selectedItem?.support_images?.length ? (
                <View className="mb-4">
                  <Text
                    className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
                  >
                    More Images
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedItem.support_images.map(
                      (uri: string, i: number) => (
                        <Image
                          key={i}
                          source={{ uri }}
                          style={{
                            width: 120,
                            height: 120,
                            marginRight: 10,
                            borderRadius: 8,
                          }}
                          resizeMode="cover"
                        />
                      ),
                    )}
                  </ScrollView>
                </View>
              ) : null}

              <View
                className={`${isDark ? "border-gray-700" : "border-gray-200"} border-t pt-4 mt-4`}
              >
                <Text
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
                >
                  ₱{selectedItem?.price}
                </Text>
                <View className="gap-3">
                  <TouchableOpacity
                    className={`w-full ${isDark ? "bg-green-500 active:bg-green-600" : "bg-gray-900 active:bg-gray-800"} px-4 py-3.5 rounded-lg`}
                  >
                    <Text className="text-white text-center font-semibold">
                      Purchase Now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`w-full ${isDark ? "border border-gray-600 active:bg-gray-700" : "border border-gray-300 active:bg-gray-50"} px-4 py-3.5 rounded-lg`}
                  >
                    <Text
                      className={`${isDark ? "text-white" : "text-gray-900"} text-center font-semibold`}
                    >
                      Message Seller
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;
