import React, {useRef} from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native/index";
import {
    Text
} from "react-native-ui-lib";
import Modalize from "../Modalize";

const Picker = (props) => {
    const {
        label,
        value,
        options,
        onChange
    } = props;
    const refModalize = useRef();

    const onPressValue = (value) => {
        refModalize.current.close();

        onChange(value);
    }

    const _openSelect = () => {
        refModalize.current?.open();
    }
    const _activeValueLabel = () => {
        return (options || []).find((t) => t.value === value)?.label || ""
    }

    return (
        <>

            <TouchableOpacity
                onPress={_openSelect}
                style={[ styles.picker, styles.pickerHr, props?.style || {} ]}
            >

                <View>
                    <Text style={styles.pickerTitle}>{ label }</Text>

                    {
                        Boolean(value) && (
                            <Text style={styles.pickerValue}>{_activeValueLabel()}</Text>
                        )
                    }
                </View>

            </TouchableOpacity>
    
    
            <Modalize innerRef={refModalize}>
                <View style={{paddingVertical: 18}}>
                    {
                        options.map((item, idx) => (
                            <TouchableOpacity
                                key={`picket-item-${idx}-${item.value}`}
                                style={styles.pickerItem}
                                onPress={() => onPressValue(item.value)}
                            >
                                <Text style={styles.pickerItemLabel}>{ item.label }</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </Modalize>

        </>
    )
}

const styles = StyleSheet.create({
    picker: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pickerHr: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "#eff2f4"
    },
    pickerTitle: {
        fontSize: 16,
        lineHeight: 22,
        color: "#333333",
        fontWeight: "500"
    },
    pickerValue: {
        marginTop: 4,
        fontSize: 14,
        lineHeight: 16,
        color: "#8b8b8b",
        fontWeight: "500"
    },
    pickerIcon: {},

    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    pickerItemLabel: {
        fontSize: 18,
        lineHeight: 20,
        color: "#333333",
        fontWeight: "500"
    }
});

export default Picker
