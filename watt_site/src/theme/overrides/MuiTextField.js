import {palette} from "../common";

export default {
    styleOverrides: {
        root: {
            "& .MuiInputLabel-root": {
                transform: "translate(16px, 11px) scale(1)",

                fontWeight: "300",
                fontSize: 16,
                color: "#8E8E8E",

                "&.Mui-focused, &.MuiFormLabel-filled": {
                    transform: "translate(16px, -11px) scale(0.75)"
                }
            }
        }
    }
}
