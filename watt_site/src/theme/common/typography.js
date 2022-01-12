const palette = require('./palette');
const theme = require("../index");

module.exports = {
  h1: {
    color: palette.text.primary,
    fontWeight: 'normal',
    fontSize: '40px',
    lineHeight: '48px',
  },
  h2: {
    color: "white",
    fontWeight: "600",
    fontSize: '35px',
    lineHeight: '42px'
  },
  h3: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: "30px",
    textAlign: "center",
    fontFeatureSettings: "'ss03' on, 'ss06' on",
    color: "#000000",

    "@media (max-width: 900px)": {
      fontSize: 22,
      lineHeight: "26px",
    }
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '18px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
    fontFeatureSettings: "'ss01' on"
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },

  subtitle1: {
    color: palette.text.primary,
    fontSize: '16px',
    lineHeight: '24px'
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: '500',
    letterSpacing: '0.02em',
    color: '#A8ABB8',
    fontFeatureSettings: "'ss03' on, 'ss06' on"
  },

  body1: {
    color: "#DADADA",
    fontSize: '18px',
    lineHeight: '30px'
  },
  body2: {
    //
    color: '#9FA3B7',
    //color: palette.text.secondary,
    letterSpacing: '0.02px',
    fontFeatureSettings: "'ss03' on, 'ss06' on",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
  },

  caption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 16,
    lineHeight: "23px",
    textAlign: "center",
    color: "#8E8E8E"
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase'
  },

  fontFamily: ['SF UI Display'].join(','),
  fontSize: 18
};
