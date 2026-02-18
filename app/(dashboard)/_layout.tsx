import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const borderColor = isDark ? "border-green-500" : "border-green-600";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const floatBg = isDark ? "bg-gray-800" : "bg-gray-100";
  const floatBorder = isDark ? "border-gray-700" : "border-gray-200";

  return (
    <View
      className="absolute bottom-0 left-0 right-0 items-center"
      pointerEvents="box-none"
    >
      <View
        className={`flex-row ${bgColor} h-[86px] border-t-2 ${borderColor} rounded-t-2xl px-5 items-center justify-between w-full shadow-lg`}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const isCenter = route.name === "cart";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            setMenuOpen(false);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return <View key={route.key} className="w-[72px]" />;
          }

          const icons: Record<string, any> = {
            home: "home-outline",
            chat: "chatbubble-outline",
            notification: "notifications-outline",
            profile: "person-outline",
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center"
            >
              <Ionicons
                name={icons[route.name] ?? "ellipse"}
                size={25}
                color={isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Floater */}
      {menuOpen && (
        <View
          className="absolute top-[-80px] z-10 w-full flex-row items-center self-center justify-center"
          pointerEvents="box-none"
        >
          <TouchableOpacity
            className={`flex-row items-center ${floatBg} px-3 py-2 rounded-2xl mx-0.5 border ${floatBorder}`}
            onPress={() => {
              setMenuOpen(false);
              router.push("/(dashboard)/home");
            }}
          >
            <Ionicons
              name="checkmark"
              size={18}
              color={isDark ? "#fff" : "#000"}
            />
            <View className="w-4" />
            <View>
              <Text className={`${textColor} text-[13px]`}>Check</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center ${floatBg} px-3 py-2 rounded-2xl mx-0.5 border ${floatBorder}`}
            onPress={() => {
              setMenuOpen(false);
              router.push("/(pill)/post");
            }}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={isDark ? "#fff" : "#000"}
            />
            <View className="w-4" />
            <View>
              <Text className={`${textColor} text-[13px]`}>Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* center button */}
      <View
        className="absolute top-[-40px] w-full items-center"
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={() => setMenuOpen((s) => !s)}
          className={`w-20 h-20 rounded-full items-center justify-center border-0 border-gray-200 shadow-lg ${isDark ? "bg-green-500" : "bg-green-600"}`}
        >
          <Ionicons
            name="cart-outline"
            size={40}
            color={isDark ? "#000" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      // supply our custom tab bar to react navigation
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="cart" options={{ title: "" }} />
      <Tabs.Screen name="notification" options={{ title: "Notification" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default DashboardLayout;
