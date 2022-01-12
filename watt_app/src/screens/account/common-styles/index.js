import { getFontFamily } from "../../../theme/theme-manager/Text";

const commonStylesAccount = {

  section: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16
  },

  title: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#282828",
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center"
  },

  inputContainer: {
    height: 40,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    paddingHorizontal: 16,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F7F7F7",
  },
  inputContainerError: {
    borderColor: "#F5386A",
  },
  inputItem: {
    flex: 1,
    fontSize: 14,
    color: "#282828",
    fontFamily: getFontFamily("normal"),

    paddingHorizontal: 0,
    paddingVertical: 0
  },
  inputErrorMessage: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
    color: "#F5386A",
    marginLeft: 12,
    marginTop: 8
  }

}

export default commonStylesAccount
