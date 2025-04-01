import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import InfoIcon from '@/assets/icons/ic_info.svg';
import RectangelYellowIcon from '@/assets/icons/ic_rectangle_yellow.svg';
import RectangleBlueIcon from '@/assets/icons/ic_rectangle_blue.svg';
import TailIcon from '@/assets/icons/ic_tail.svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const desiredWidth = screenWidth * 0.65 - 55;
const ToolTipProgress = ({ closeTooltip, tooltipData, tooltipPosition }) => {
    const positionDetailTooltip = tooltipPosition.y > screenHeight * 0.8 ? 1 : 0;
    return (
        <TouchableOpacity
            style={styles.fullScreenOverlay}
            activeOpacity={1}
            onPress={closeTooltip}
        >
            {tooltipData && (
                <View style={[styles.tooltipContainer, { top: tooltipPosition.y - 20, left: 8 }]}>
                    <View>
                        <View style={styles.headerToolTip}>
                            <View style={[styles.progressBarContainer, { backgroundColor: '#FFBC39' }]}>
                                <View style={[styles.progressBar, { width: `${tooltipData.progress1}%`, backgroundColor: "#FF9432" }]}>
                                    <Text style={styles.progressText}>{tooltipData.progress1}%</Text>
                                </View>

                            </View>
                            <View style={[styles.progressBarContainer, { backgroundColor: 'rgba(62, 195, 247, 0.2)' }]}>
                                <View style={[styles.progressBar, { width: `${tooltipData.progress2}%`, backgroundColor: '#0375F3' }]}>
                                    <Text style={styles.progressText}>{tooltipData.progress2}%</Text>
                                </View>
                            </View>
                            <InfoIcon style={{ marginTop: 5 }} />
                        </View>
                        <TailIcon style={[styles.iconUp,positionDetailTooltip == 1 && styles.iconDown]}></TailIcon>
                    </View>
                    <View style={[styles.containerDetailProgress,
                        {
                            marginTop: positionDetailTooltip == 1 ? -75 : 0
                        }
                    ]}>
                        <View style={styles.contentDetailProgress}>
                            <View style={styles.rowDetailProgress}>
                                <View style={{ flexDirection: 'row' }}>
                                    <RectangelYellowIcon />
                                    <Text style={styles.tooltipLable}>Tiến độ Kế hoạch Nguyên liệu</Text>
                                </View>
                                <Text style={styles.tooltipText}>{tooltipData.progress1}%</Text>
                            </View>
                            <View style={styles.rowDetailProgress}>
                                <View style={{ flexDirection: 'row' }}>
                                    <RectangleBlueIcon />
                                    <Text style={styles.tooltipLable}>Tiến độ Nhập kho Thành phẩm</Text>
                                </View>
                                <Text style={styles.tooltipText}>{tooltipData.progress2}%</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default ToolTipProgress

const styles = StyleSheet.create({
    fullScreenOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    tooltipContainer: {
        zIndex: 30,
        position: 'absolute',
        marginLeft: 25,
        width: desiredWidth
    },
    tooltipLable: {
        color: '#3A3E4C',
        fontSize: 10,
        fontFamily: 'LexendDeca-Medium',
        marginLeft: 5,
        fontWeight: 'bold',
        lineHeight: 16
    },
    tooltipText: {
        color: "#667085",
        fontSize: 10,
        fontFamily: 'LexendDeca-Medium',
        lineHeight: 16
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
    headerToolTip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 32,
        backgroundColor: "#FFFFFF",
        width: '100%',
        padding: 5,
        borderRadius: 5,
    },
    progressBar: {
        backgroundColor: '#4CAF50',
        height: 12,
        borderRadius: 5,
    },
    rowDetailProgress: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressText: {
        fontSize: 8,
        color: '#FFFFFF',
        fontFamily: 'LexendDeca-Regular',
        textAlign: 'center',
        lineHeight: 12
    },
    containerDetailProgress: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '105%',
    },
    contentDetailProgress: {
        height: 70,
        justifyContent: 'space-evenly',
    },
    iconUp: {
        alignSelf: 'flex-end',
        marginRight: -3,
        marginTop: -5
    },
    iconDown: {
        transform: [{ rotate: '180deg' }],
        marginTop: -37
    }
})