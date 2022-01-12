import React, {useRef, useState} from "react";
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native/index";
import {
    Text,
} from "react-native-ui-lib";
import TextField from "../TextField";
import Modalize from "../Modalize";

const PickerTokens = (props) => {
    const {
        value,
        innerRef,
        options,
        onChange,
    } = props;
    const [search, setSearch] = useState("");
    
    const onPressValue = (value) => {
        onChange(value);
    };
    
    const _renderItem = ({item, index}) => {
        
        return (
            <TouchableOpacity
                key={`picket-item-${index}-${item.value}`}
                style={styles.token}
                onPress={() => onPressValue(item.value)}
            >
                <Image
                    style={styles.tokenLogo}
                    source={{uri: item.logo}}
                />
                
                <View style={styles.tokenBody}>
                    <View style={styles.tokenBodyHeader}>
                        <Text style={styles.tokenCode}>{item.symbol}</Text>
                        <Text style={styles.tokenNetwork}>({item.network})</Text>
                    </View>
                    <Text style={styles.tokenName}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <TextField
                    value={search}
                    placeholder="Search..."
                    onChangeText={(value) => setSearch(value)}
                />
            </View>
        )
    }
    
    const _options = () => {
        return options.filter((t) => t.label.toLowerCase().indexOf(search.toLowerCase()) > -1)
    }
    
    return (
        <Modalize innerRef={innerRef}>
            <View style={styles.modal}>
                {_renderHeader()}
                <SafeAreaView style={{flex: 1}}>
                    <FlatList
                        data={_options()}
                        renderItem={_renderItem}
                    />
                </SafeAreaView>
            </View>
        </Modalize>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 18,
        marginBottom: 12
    },
    headerSearch: {},
    
    token: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    tokenLogo: {
        width: 40,
        height: 40,
        marginRight: 12
    },
    tokenBody: {
        flex: 1
    },
    tokenBodyHeader: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    tokenCode: {
        fontSize: 16,
        lineHeight: 18,
        color: "#333333",
        fontWeight: "500"
    },
    tokenName: {
        fontSize: 12,
        lineHeight: 18,
        color: "#333333",
        fontWeight: "500",
        opacity: 0.6
    },
    tokenNetwork: {
        fontSize: 10,
        lineHeight: 18,
        color: "#333333",
        opacity: 0.6,
        marginLeft: 6
    },
    
  
    modal: {
        paddingVertical: 18
    },
});

export default PickerTokens;
