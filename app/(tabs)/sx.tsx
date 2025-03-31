import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MenuIcon from '@/assets/icons/ic_menu.svg';
import PinIcon from '@/assets/icons/ic_pin.svg';
import EmptySXIcon from '@/assets/icons/ic_empty_sx.svg';

import SideSheetModal from '@/components/SideSheetModal';

export default function HomeScreen() {
  const [isSideSheetVisible, setIsSideSheetVisible] = useState(false);

  const openSideSheet = () => {
    setIsSideSheetVisible(true);
  };

  const closeSideSheet = () => {
      setIsSideSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0375F3" />
      <LinearGradient
        colors={['#0375F3', '#0B69D2']}
        style={styles.appBar}
      >
        <TouchableOpacity style={styles.menuButton} onPress={openSideSheet}>
          <MenuIcon />
        </TouchableOpacity>
        <Text style={styles.appTitle}>Lệnh Sản Xuất</Text>
        <View style={styles.menuButton}></View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.emptyBodyContainer}>
          <View style={styles.viewIconEmpty}>
            <EmptySXIcon />
          </View>
          <Text style={styles.emptyText}>Chưa có Lệnh sản xuất.</Text>
          <TouchableOpacity style={styles.actionButton} onPress={openSideSheet}>
            <PinIcon />
            <Text style={styles.buttonText}>Bắt đầu ghim lệnh ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SideSheetModal
        isVisible={isSideSheetVisible}
        onClose={closeSideSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  appTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'LexendDeca-Medium',
    lineHeight: 28
  },
  menuButton: {
    padding: 8,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6'
  },
  emptyBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewIconEmpty: {
    width: 211,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#11315B',
    marginVertical: 30,
    fontFamily: 'LexendDeca-Regular',
    lineHeight: 28,
    textAlign: 'center'
  },
  actionButton: {
    backgroundColor: '#0375F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    lineHeight: 24,
    fontFamily: 'LexendDeca-Regular'
  },
  productionOrderList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    width: '100%'
  },
});
