import {palette} from "../common";

export default {
    styleOverrides: {
        root: {
            width: 32,
            height: 32,
            borderRadius: 10,

            border: "2px solid #282828",
            position: "relative",

            "& svg": {
                fill: "transparent"
            },
            "&.Mui-checked": {
                backgroundColor: "#282828",
                "&:after": {
                    content: "'✓'",
                    fontSize: 24,
                    position: "absolute"
                }
            },

            "&:after": {
                fontSize: 24,
                position: "absolute"
            }
        }
    }
}
