import {palette} from "../common";

export default {
    styleOverrides: {
        root: {
            height: 45,
            background: "#F7F7F7",
            border: "1px solid #E8E8E8",
            boxSizing: "border-box",
            borderRadius: 14,

            "& .MuiOutlinedInput-notchedOutline": {
                border: "none"
            },

            "& .MuiOutlinedInput-input": {
                padding: "9px 16px",
            }
        }
    }
}
