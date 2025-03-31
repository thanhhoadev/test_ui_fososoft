import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import DashBoardIcon from '@/assets/icons/ic_dashboard.svg';
import OrderIcon from '@/assets/icons/ic_order.svg';
import GanttIcon from '@/assets/icons/ic_gantt.svg';
import SXIcon from '@/assets/icons/ic_sx.svg';
import MoreIcon from '@/assets/icons/ic_more.svg';
import SXSelectIcon from '@/assets/icons/ic_sx_selected.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0375F3',
        tabBarInactiveTintColor: '#9295A4',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 12,
          paddingRight: 24,
          paddingBottom: 16,
          paddingLeft: 24
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tổng quan',
          tabBarIcon: ({ color, size, focused }) => (
            <DashBoardIcon width={size} height={size} fill={focused ? '#0375F3' : '#9295A4'} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color, size, focused }) => (
            <OrderIcon width={size} height={size} fill={focused ? '#0375F3' : '#9295A4'} />
          ),
        }}
      />
      <Tabs.Screen
        name="gantt"
        options={{
          title: 'Sơ đồ Gantt',
          tabBarIcon: ({ color, size, focused }) => (
            <GanttIcon width={size} height={size} fill={focused ? '#0375F3' : '#9295A4'} />
          ),
        }}
      />
      <Tabs.Screen
        name="sx"
        options={{
          title: 'Lệnh SX',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? <SXIcon width={size} height={size} /> : <SXSelectIcon width={size} height={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Xem thêm',
          tabBarIcon: ({ color, size, focused }) => (
            <MoreIcon width={size} height={size} fill={focused ? '#0375F3' : '#9295A4'} />
          ),
        }}
      />
    </Tabs>
  );
}
