import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.tabBarContainer} pointerEvents="box-none">
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const isCenter = route.name === 'cart';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            setMenuOpen(false);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <View key={route.key} style={styles.centerPlaceholder} />
            );
          }

          const icons: Record<string, any> = {
            home: 'home-outline',
            chat: 'chatbubble-outline',
            notification: 'notifications-outline',
            profile: 'person-outline',
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              style={styles.tabButton}
              key={route.key}
            >
              <Ionicons name={icons[route.name] ?? 'ellipse'} size={20}  />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Floater */}
      {menuOpen && (
        <View style={styles.menuWrap} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.pill}
            onPress={() => {
              setMenuOpen(false);
              router.push('/(pill)/check');
            }}
          >
            <Ionicons name="checkmark" size={18} color="#111827" />
            <View className='w-6'/>
            <View>
              <Text style={styles.pillText}>Check</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pill}
            onPress={() => {
              setMenuOpen(false);
              router.push('/(pill)/post');
            }}
          >
            <Ionicons name="create-outline" size={18} color="#111827" />
            <View className='w-6'/>
            <View>
              <Text style={styles.pillText}>Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

        {/* center button */}
      <View style={styles.centerButtonWrap} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => setMenuOpen((s) => !s)}
          style={styles.centerButton}
        >
          <Ionicons name="cart" size={25} color="#111827" />
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
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="cart" options={{ title: '' }} />
      <Tabs.Screen name="notification" options={{ title: 'Notification' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default DashboardLayout

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'android' ? 12 : 24,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    height: 64,
    borderRadius: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  centerPlaceholder: { width: 72 },
  centerButtonWrap: {
    position: 'absolute',
    top: -28,
    width: '100%',
    alignItems: 'center',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  menuWrap: {
    position: 'absolute',
    top: -88,
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillText: {
    color: '#111827',
    fontSize: 13,
  },
})