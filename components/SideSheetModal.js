import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Animated,
    Dimensions
} from 'react-native';

import SeacrchIcon from '@/assets/icons/ic_search.svg';
import FilterStatusIcon from '@/assets/icons/ic_filter_status.svg';
import UpIcon from '@/assets/icons/ic_up.svg';
import CheckBoxFalseIcon from '@/assets/icons/ic_checkbox_false.svg';
import CheckBoxTrueIcon from '@/assets/icons/ic_checkbox_true.svg';
import UnPinIcon from '@/assets/icons/ic_unpin.svg';
import { ProductionDataContext } from '@/contexts/ProductionDataContext';

import ProductionOrderItem from './ProductionOrderItem';
import ToolTipProgress from './ToolTipProgress';

const { width: screenWidth } = Dimensions.get('window');

const SideSheetModal = ({ isVisible, onClose }) => {

    const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

    useEffect(() => {
        if (isVisible) {
            slideAnim.setValue(-screenWidth);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, onClose, slideAnim]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: -screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    const [isShowFilter, setisShowFilter] = useState(false);
    const [isNotYetFilter, setisNotYetFilter] = useState(true);
    const [isPendingFilter, setisPendingFilter] = useState(true);
    const [isCompleteFilter, setisCompleteFilter] = useState(true);

    const { data, updatePin, unpinAll } = useContext(ProductionDataContext);
    const [dataShow, setDataShow] = useState(data);

    const [searchText, setSearchText] = useState('');

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleInfoIconPress = (item, event) => {
        const { pageX, pageY } = event.nativeEvent;
        console.log(Math.floor(pageX), Math.floor(pageY));
        setTooltipPosition({ x: Math.floor(pageX), y: Math.floor(pageY) });
        setTooltipData(item);
        setIsOverlayVisible(true);
    };

    const closeTooltip = () => {
        setIsOverlayVisible(false);
        setTooltipData(null);
    };

    const renderItemPinned = ({ item }) => (
        <ProductionOrderItem item={item} onUpdatePin={updatePin} onInfoPress={handleInfoIconPress} />
    );

    const sortAndFilterData = () => {
        let filteredData = data;
        if (!isNotYetFilter) {
            filteredData = filteredData.filter(item => item.status !== 0);
        }
        if (!isPendingFilter) {
            filteredData = filteredData.filter(item => item.status !== 1);
        }
        if (!isCompleteFilter) {
            filteredData = filteredData.filter(item => item.status !== 2);
        }
        const pinnedItems = filteredData.filter(item => item.isPin === true);
        const unpinnedItems = filteredData.filter(item => item.isPin === false);
        const sortedDataShow = [...pinnedItems, ...unpinnedItems];

        setDataShow(sortedDataShow);
    }

    useEffect(() => {
        sortAndFilterData();
    }, [data, isNotYetFilter, isPendingFilter, isCompleteFilter]);



    useEffect(() => {
        if (searchText.length > 0) {
            const lowerCaseSearchText = searchText.toLowerCase();
            const searchDataShow = data.filter(item => item.code.toLowerCase().includes(lowerCaseSearchText));
            setDataShow(searchDataShow);
        } else {
            sortAndFilterData();
        }
    }, [searchText])

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleClose}
        >
            <Animated.View
                style={
                    {
                        transform: [{ translateX: slideAnim }],
                        width: '100%'
                    }
                }
            >
                <View style={{ flexDirection: 'row', width: screenWidth, height: '100%' }}>
                    <View style={styles.sideSheetContent}>
                        <View style={styles.sideSheetHeader}>
                            <Text style={styles.sideSheetTitle}>Lệnh Sản Xuất</Text>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Tìm kiếm mã lệnh sản xuất"
                                    value={searchText}
                                    onChangeText={text => setSearchText(text)}
                                />
                                <TouchableOpacity style={styles.searchButton}>
                                    <SeacrchIcon />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.sideSheetBody}>


                            <View style={styles.filterSection}>
                                <TouchableOpacity
                                    onPress={() => setisShowFilter(!isShowFilter)}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FilterStatusIcon style={{ paddingTop: 20, marginRight: 5 }} />
                                            <Text style={styles.filterTitle}>Trạng thái</Text>
                                        </View>
                                        {isShowFilter ? <UpIcon style={{ paddingTop: 20 }} /> : <UpIcon style={{ transform: [{ rotate: '180deg' }], paddingTop: 20 }} />}
                                    </View>
                                </TouchableOpacity>
                                {isShowFilter &&
                                    <View style={{ borderTopColor: '#D0D5DD', borderTopWidth: 2, marginTop: 10, paddingHorizontal: 10 }}>
                                        <TouchableOpacity style={styles.filterItem} onPress={() => setisNotYetFilter(!isNotYetFilter)}>
                                            {isNotYetFilter ?
                                                <CheckBoxTrueIcon /> :
                                                <CheckBoxFalseIcon />
                                            }
                                            <Text style={[
                                                styles.filterText,
                                                { backgroundColor: "rgba(255, 129, 26, 0.15)", color: "#C25705" },
                                            ]}
                                            >Chưa sản xuất</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.filterItem} onPress={() => setisPendingFilter(!isPendingFilter)}>
                                            {isPendingFilter ?
                                                <CheckBoxTrueIcon /> :
                                                <CheckBoxFalseIcon />
                                            }
                                            <Text style={[styles.filterText, { backgroundColor: "rgba(62, 195, 247, 0.2)", color: "#076A94" }]}>Đang sản xuất</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.filterItem} onPress={() => setisCompleteFilter(!isCompleteFilter)}>
                                            {isCompleteFilter ?
                                                <CheckBoxTrueIcon /> :
                                                <CheckBoxFalseIcon />
                                            }
                                            <Text style={[styles.filterText, { backgroundColor: "rgba(53, 189, 75, 0.2)", color: "#1A7526" }]}>Hoàn thành</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>

                            <TouchableOpacity style={styles.clearAllButton} onPress={unpinAll}>
                                <Text style={styles.clearAllText}>Bỏ ghim toàn bộ</Text>
                                <UnPinIcon />
                            </TouchableOpacity>

                            {dataShow.length > 0 && (
                                <FlatList
                                    data={dataShow}
                                    renderItem={renderItemPinned}
                                    keyExtractor={item => item.id}
                                    style={styles.productionOrderList}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.sideSheetOverlay}
                        activeOpacity={1}
                        onPress={handleClose}
                    ></TouchableOpacity>
                </View>
            </Animated.View>
            {isOverlayVisible && (
                <ToolTipProgress closeTooltip={closeTooltip} tooltipPosition={tooltipPosition} tooltipData={tooltipData} />
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    sideSheetOverlay: {
        width: '200%',
        height: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#F3F4F6',
    },
    sideSheetContent: {
        width: '65%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    sideSheetHeader: {
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        paddingTop: 35,
        gap: 5
    },
    sideSheetTitle: {
        fontSize: 18,
        fontFamily: 'LexendDeca-Medium',
        color: "#25387A",
        lineHeight: 28,
        fontWeight: 'bold'
    },
    closeButton: {
        padding: 10,
    },
    sideSheetBody: {
        flex: 1,
        paddingHorizontal: 15
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        height: 40,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 10,
        height: 40,
        borderRightWidth: 0
    },
    searchButton: {
        backgroundColor: '#92BFF7',
        padding: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: 41,
        borderWidth: 0,
        width: 48
    },
    filterSection: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        paddingVertical: 10,
        borderRadius: 10
    },
    filterTitle: {
        fontSize: 14,
        fontFamily: 'LexendDeca-Renggular',
        lineHeight: 20,
        color: '#3A3E4C',
        fontWeight: '600',
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    filterText: {
        marginLeft: 10,
        borderRadius: 7,
        padding: 7,
        fontSize: 14,
        fontFamily: 'LexendDeca-Regular',
        fontWeight: '500'
    },
    clearAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        justifyContent: 'space-between'
    },
    clearAllText: {
        color: '#11315B',
        fontFamily: 'LexendDeca-Medium',
        fontSize: 14,
        fontWeight: '600'
    },
    productionOrderList: {
        flex: 1,
        paddingTop: 15,
    },
    productionOrderItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: (status) => ({
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor:
            status === 'Chưa sản xuất' ? '#FF811A' :
                status === 'Đang sản xuất' ? '#2196F3' :
                    status === 'Hoàn thành' ? '#4CAF50' : 'gray',
    }),
    itemDetails: {
        flex: 1,
    },
    itemCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#11315B',
        marginBottom: 5,
        fontFamily: 'LexendDeca-Medium',
    },
    itemDeadline: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
        fontFamily: 'LexendDeca-Regular',
    },
    progressBarContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 5,
        height: 8,
        overflow: 'hidden',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        backgroundColor: '#4CAF50',
        height: 8,
        borderRadius: 5,
    },
    progressText: {
        fontSize: 12,
        color: '#757575',
        marginLeft: 8,
        fontFamily: 'LexendDeca-Regular',
    },
});

export default SideSheetModal;