import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowRight as CommonArrowRightIcon,
  CommonArrowLeft as CommonArrowLeftIcon
} from "../../assets/icons";
import BlurView from "../BlurView";
import { Portal } from "react-native-portalize";
import { Calendar } from "react-native-calendars";
import Svg, { Path } from "react-native-svg";
import moment from "moment";

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      view: "day",

      year: moment().format('YYYY'),
      month: moment().format('MM'),
      day: 10,

      open: true
    };

    this.refModalize = React.createRef();
  }

  open = ({ onChange }) => {}
  close = () => {}

  onChangeDate = (date) => {}


  render() {
    const {
      year,
      month,
      day,

      view
    } = this.state;

    return (
      <Portal>
        <BlurView style={{flex: 1}}>
          <TouchableOpacity style={styles.root} activeOpacity={1}>
            <View style={styles.container}>

              <CalendarHeader
                month={month}
                year={year}
                day={day}
              />

              {Boolean(view === "day")&&(
                <CalendarDays
                  month={month}
                  year={year}
                  day={day}

                  onChange={this.onChangeDate}
                />
              )}

            </View>
          </TouchableOpacity>
        </BlurView>
      </Portal>
    );
  }
}

const CalendarHeader = (props) => {
  const {
    month,
    year,
    day
  } = props;
  const monthString = moment(`${year}-${month}-${day}`).format('MMMM');

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerControl}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M8.49995 12.7998L14.2 18.3998C14.6 18.7998 15.2 18.7998 15.6 18.3998C16 17.9998 16 17.3998 15.6 16.9998L10.7 11.9998L15.6 6.9998C16 6.5998 16 5.9998 15.6 5.5998C15.4 5.3998 15.2 5.2998 14.9 5.2998C14.6 5.2998 14.4 5.3998 14.2 5.5998L8.49995 11.1998C8.09995 11.6998 8.09995 12.2998 8.49995 12.7998C8.49995 12.6998 8.49995 12.6998 8.49995 12.7998Z" fill="#8E8E8E"/>
        </Svg>
      </TouchableOpacity>
      <View style={styles.headerBody}>
        <Text style={styles.headerTitle}>{ monthString } { year }</Text>
      </View>
      <TouchableOpacity style={styles.headerControl}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M15.54 11.29L9.87998 5.64004C9.78702 5.54631 9.67642 5.47191 9.55456 5.42115C9.4327 5.37038 9.30199 5.34424 9.16998 5.34424C9.03797 5.34424 8.90726 5.37038 8.78541 5.42115C8.66355 5.47191 8.55294 5.54631 8.45998 5.64004C8.27373 5.8274 8.16919 6.08085 8.16919 6.34504C8.16919 6.60922 8.27373 6.86267 8.45998 7.05004L13.41 12.05L8.45998 17C8.27373 17.1874 8.16919 17.4409 8.16919 17.705C8.16919 17.9692 8.27373 18.2227 8.45998 18.41C8.5526 18.5045 8.66304 18.5797 8.78492 18.6312C8.90679 18.6827 9.03767 18.7095 9.16998 18.71C9.30229 18.7095 9.43317 18.6827 9.55505 18.6312C9.67692 18.5797 9.78737 18.5045 9.87998 18.41L15.54 12.76C15.6415 12.6664 15.7225 12.5527 15.7779 12.4262C15.8333 12.2997 15.8619 12.1631 15.8619 12.025C15.8619 11.8869 15.8333 11.7503 15.7779 11.6238C15.7225 11.4973 15.6415 11.3837 15.54 11.29Z" fill="#8E8E8E"/>
        </Svg>
      </TouchableOpacity>
    </View>
  )
}
const CalendarDays = (props) => {
  const {
    day,
    month,
    year,
    onChange
  } = props;

  return (
    <Calendar
      hideArrows
      disableMonthChange={true}
      firstDay={1}
      selected={'2012-03-01'}
    />
  )
}
const CalendarMonths = () => {}
const CalendarYears = () => {}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 28,
    paddingBottom: 48
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 14,
    overflow: "hidden",
  },
  controls: {
    flexDirection: "row"
  },

  header: {
    flexDirection: "row"
  },
  headerControl: {
    width: 24,
    height: 24
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    lineHeight: 24,
    color: "#282828",
    fontWeight: "600"
  },
});

export default DatePicker
