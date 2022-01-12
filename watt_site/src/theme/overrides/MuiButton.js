import {palette} from "../common";

export default {
    styleOverrides: {

        root: {
            height: 52,
            boxShadow: "0px 0px 2px rgba(172, 172, 172, 0.2)",
            borderRadius: 14,

            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            textAlign: "center",
            color: "#282828",
            textTransform: "initial"
        },

        outlined: {
            borderColor: palette.primary.main,
            color: palette.primary.main
        },
    }
}
