import {StyleSheet} from '@react-pdf/renderer';

const InputSectionStyles = StyleSheet.create({
    inputSectionContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
    },
    inputSectionLeftColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    },
    inputSectionRightColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    },
    inputSectionText: {
        margin: 4
    }
});

export default InputSectionStyles;
