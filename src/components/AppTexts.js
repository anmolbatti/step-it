import { Text, StyleSheet } from "react-native";

const RegularText = ({ children, ...props }) => {
    const styles = StyleSheet.create({
        "appText": {
            fontFamily: "Regular",
            ...props.style
        }
    });

    return (
        <Text style={styles.appText} allowFontScaling={false}>{children}</Text>
    );
}

const BoldText = ({ children, ...props }) => {
    const styles = StyleSheet.create({
        "appText": {
            fontFamily: "Bold",
            ...props.style
        }
    });

    return (
        <Text style={styles.appText} allowFontScaling={false}>{children}</Text>
    );
}

const SemiBold = ({ children, ...props }) => {
    const styles = StyleSheet.create({
        "appText": {
            fontFamily: "SemiBold",
            fontWeight: "600",
            lineHeight: 24,
            ...props.style
        }
    });

    return (
        <Text style={styles.appText} allowFontScaling={false}>{children}</Text>
    );
}

const MediumText = ({ children, ...props }) => {
    const styles = StyleSheet.create({
        "appText": {
            fontFamily: "SansMedium",
            ...props.style
        }
    });

    return (
        <Text style={styles.appText} allowFontScaling={false}>{children}</Text>
    );
}

export {
    RegularText,
    BoldText,
    SemiBold,
    MediumText
}