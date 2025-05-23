import { View, Text, StyleSheet } from "react-native";

type ButtonsProps = {
    btnTitle: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
};

export default function Button({
    btnTitle,
    backgroundColor = "transparent",
    borderColor = "#06b6d4",
    textColor = "white",
}: ButtonsProps) {
    return (
        <View
            style={[
                styles.button,
                { backgroundColor, borderColor },
            ]}
        >
            <Text style={{ color: textColor, fontSize: 16 }}>{btnTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderWidth: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
});
