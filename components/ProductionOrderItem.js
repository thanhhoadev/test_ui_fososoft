import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import PinDeactiveIcon from '@/assets/icons/ic_pin_deactive.svg';
import PinActiveIcon from '@/assets/icons/ic_pin_active.svg';
import InfoIcon from '@/assets/icons/ic_info.svg';

const ProductionOrderItem = ({ item, onUpdatePin }) => {
    return (
        <LinearGradient // Thay View bằng LinearGradient
            colors={['#FFFFFF', 'rgba(199, 223, 251, 0.21)']} // Mảng các màu gradient
            style={styles.productionOrderItem} // Áp dụng style hiện có
            start={{ x: 0, y: 0 }} // Điểm bắt đầu gradient (trái)
            end={{ x: 1, y: 0 }} // Điểm kết thúc gradient (phải)
        >
            <View style={styles.lineLeft} />
            <View style={styles.itemDetails}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        item.status == 0 ? <Text style={[styles.filterText, { backgroundColor: "rgba(255, 129, 26, 0.15)", color: "#C25705" }]}>Chưa sản xuất</Text> :
                            item.status == 1 ? <Text style={[styles.filterText, { backgroundColor: "rgba(62, 195, 247, 0.2)", color: "#076A94" }]}>Đang sản xuất</Text> :
                                <Text style={[styles.filterText, { backgroundColor: "rgba(53, 189, 75, 0.2)", color: "#1A7526" }]}>Hoàn thành</Text>
                    }
                    <TouchableOpacity onPress={() => onUpdatePin(item.id)} 
                        style={styles.viewTouchPin}
                        >
                        {item.isPin ? <PinActiveIcon /> : <PinDeactiveIcon />}
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemCode}>{item.code}</Text>
                <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 22 }}>
                    <View style={[styles.progressBarContainer, { backgroundColor: '#FFBC39' }]}>
                        <View style={[styles.progressBar, { width: `${item.progress1}%`, backgroundColor: "#FF9432" }]}>
                            <Text style={styles.progressText}>{item.progress1}%</Text>
                        </View>

                    </View>
                    <View style={[styles.progressBarContainer, { backgroundColor: 'rgba(62, 195, 247, 0.2)' }]}>
                        <View style={[styles.progressBar, { width: `${item.progress2}%`, backgroundColor: '#0375F3' }]}>
                            <Text style={styles.progressText}>{item.progress2}%</Text>
                        </View>
                    </View>
                    <InfoIcon style={{ marginTop: 5 }} />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    productionOrderItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#D0D5DD",
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    lineLeft: {
        width: 4,
        height: '100%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#0375F3',
        marginRight: 10
    },
    itemDetails: {
        flex: 1,
    },
    viewTouchPin: {
        width: 30, alignItems: 'center', marginRight: -15, marginTop: -5, justifyContent: 'center'
    },
    itemCode: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#003DA0',
        marginVertical: 5,
        fontFamily: 'LexendDeca-SemiBold',
    },
    itemDeadline: {
        fontSize: 12,
        color: '#667085',
        marginBottom: 5,
        fontFamily: 'LexendDeca-Medium',
        lineHeight: 16,
        fontWeight: '500'
    },
    progressBarContainer: {
        borderRadius: 5,
        height: 12,
        width: 90,
        overflow: 'hidden',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        backgroundColor: '#4CAF50',
        height: 12,
        borderRadius: 5,
    },
    progressText: {
        fontSize: 8,
        color: '#FFFFFF',
        fontFamily: 'LexendDeca-Regular',
        textAlign: 'center',
        lineHeight: 12
    },
    likeButton: {
        padding: 8,
        marginLeft: 10,
    },
    filterText: {
        borderRadius: 7,
        padding: 7,
        fontSize: 14,
        fontFamily: 'LexendDeca-Regular',
        fontWeight: '500'
    },
});

export default ProductionOrderItem;