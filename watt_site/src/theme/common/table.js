export default {
    table: {
        style: {
            backgroundColor: "transparent"
        }
    },
    headRow: {
        style: {
            backgroundColor: "#004EA9",
            color: "white",
            borderRadius: 8,
            position: "st"
        },
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: "500",
            borderLeft: 1,
            borderColor: 'white',
            borderStyle: 'solid'
        },
    },
    rows: {
        style: {
            fontSize: 15,
            lineHeight: '18px',

            borderRadius: 8,
            marginTop: 8,

            whiteSpace: "initial!important",

            '&:nth-child(2n)': {
                backgroundColor: "#F4F4F4"
            },
            '&:nth-of-type(n)': {
                borderBottomWidth: 0
            }
        },
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
        selectedHighlightStyle: {
            '&:nth-of-type(n)': {
                backgroundColor: 'rgba(0,0,0,0.2)',
            },
            '&:nth-of-type(2n)': {
                backgroundColor: 'rgba(0,0,0,0.3)'
            },
        }
    },
    cells: {
        style: {
            borderLeftWidth: 1,
            borderStyle: "solid",
            borderColor: 'rgba(0, 0, 0, 0.2)',

            '&:nth-child(1)': {
                borderLeftWidth: 0,
            }
        }
    },
};
