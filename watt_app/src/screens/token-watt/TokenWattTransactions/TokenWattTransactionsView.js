import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList
} from "react-native/index";
import {
  Header,
  LoadSpinner
} from "../../../components";
import {
  SectionHeader as SectionHeaderComponent,
  TransactionItem as TransactionItemComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";
import moment from "moment";

class TokenWattTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],


      isLoading: true
    };
  }

  componentDidMount = async () => {
    await this.getListTransactions();
  };


  // Загрузка списка транзакций
  getListTransactions = async () => {


    // Получение списка транзакций
    const wiseWinId = this.props.accountWiseWin?.user_id;
    const data = await agentWiseWin.get(`/sync-api/watt/list?id=${ wiseWinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    });

    // Сортировака транзакций по дате
    const dataSort = data.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }

      return 0
    });

    // Сборка данных по секции
    let sections = [];
    let sectionItems = [];
    let prevDate = "";
    dataSort.map((transaction, index, list) => {
      let dateTransaction = moment(transaction.date).format("DD.MM.YYYY");

      if (!prevDate) {
        prevDate = dateTransaction;
      }

      const isPushSection = Boolean(prevDate !== dateTransaction || (list.length - 1) === index);
      if (isPushSection) {
        if (Boolean((list.length - 1) === index)) {
          sectionItems.push(transaction)
        }

        sections.push({
          title: prevDate,
          data: sectionItems
        });

        sectionItems = [];

        prevDate = dateTransaction;
      }

      sectionItems.push(transaction)
    });


    this.setState({
      transactions: sections,
      isLoading: false
    })
  }

  // Логика рендроа компонента для секции
  _renderSectionHeader = (props, index) => {
    return (
      <SectionHeaderComponent
        { ...props }
      />
    )
  }
  _renderTransaction = (props) => {
    const sectionCount = (props?.section?.data || []).length;
    const isLast = Boolean(props.index === (sectionCount - 1));

    return (
      <>

        <View style={styles.separateContainer}>
          <View style={styles.separate}/>
        </View>

        <TransactionItemComponent
          { ...props }

          isLast={isLast}
          onPress={this._routeTokenWattTransactionsDetails}
        />
      </>
    )
  }


  // Логика маршрутов
  _routeTokenWattTransactionsDetails = (tx) => {
    this.props.navigation.navigate("TokenWattTransactionsDetails", {
      transaction: tx
    })
  }

  render() {
    const {
      transactions,
      isLoading
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.tokenWattTransactions.headerTitle)}/>

        {Boolean(isLoading) && (
          <View style={styles.loadingContainer}>
            <LoadSpinner color="transparent"/>
          </View>
        )}

        <SafeAreaView style={{flex: 1}}>

          <SectionList
            sections={transactions}
            keyExtractor={(item, index) => index}

            contentContainerStyle={styles.sectionList}

            stickySectionHeadersEnabled={false}

            renderSectionHeader={this._renderSectionHeader}
            renderItem={this._renderTransaction}
          />

        </SafeAreaView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },
  sectionList: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },

  separateContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    backgroundColor: "white"
  },
  separate: {
    height: 2,
    backgroundColor: "#F9F9F9"
  },

  loadingContainer: {
    marginHorizontal: 12,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14
  }
});

export default TokenWattTransactions;
