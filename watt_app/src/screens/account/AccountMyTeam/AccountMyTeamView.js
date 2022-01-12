import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header,
  PopUpQrCode
} from "../../../components";
import {
  Controls as ControlsComponent,
  UserCard as UserCardComponent,
  MyReferrals as MyReferralsComponent,
  ReferralTree as ReferralTreeComponent
} from "./components";
import {
  CommonArrowsSingleTop,
  CommonArrowsTop as CommonArrowsTopIcon,
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";
import urls from "../../../constants/urls";


class AccountMyTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      referralList: [],

      tree: {},
      treeUserParent: {},

      activeTab: "wood", // wood || referrals
      search: "",

      userBinaryParentId: "",

      isLoadTree: true
    };

    this.refPopUpQrCode = React.createRef();
  }

  componentDidMount = async () => {
    await this.getFirstBinnary();
    await this.getReferralList();
  };

  onChangeActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };
  onChangeSearch = (search) => {
    this.setState({
      search,
    });
  };

  getReferralList = async () => {

    const wisewinId = this.props?.account?.wisewinId;
    const list = await agentWiseWin.get(`/auth/user-childs?id=${ wisewinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    })

    this.setState({
      referralList: list
    });

  }

  getFirstBinnary = async () => {
    const {
      wiseWinAccount
    } = this.props;

    const wiseWinUserId = wiseWinAccount?.user_id;
    const tree = await this._getFirstBinnaryForUser(wiseWinUserId, {}, 0, wiseWinUserId);

    this.setState({
      tree,
      isLoadTree: false
    });
  }
  getTreeChild = async (userId) => {
    this.setState({ isLoadTree: true });

    const wiseWinId = this.props?.wiseWinAccount?.user_id;
    const accountWiseWin = await agentWiseWin(`${ urls.getWiseWinAccount }${ userId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });
    const tree = await this._getFirstBinnaryForUser(userId, {}, 0, wiseWinId);

    this.setState({
      tree,
      treeUserParent: accountWiseWin,
      isLoadTree: false
    });
  }
  getMyTree = async () => {
    this.setState({ isLoadTree: true });

    const {
      wiseWinAccount
    } = this.props;

    const wiseWinUserId = wiseWinAccount?.user_id;
    const accountWiseWin = await agentWiseWin(`${ urls.getWiseWinAccount }${ wiseWinUserId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });
    const tree = await this._getFirstBinnaryForUser(wiseWinUserId, {}, 0, wiseWinUserId);

    this.setState({
      tree,
      treeUserParent: accountWiseWin,
      isLoadTree: false
    });
  }
  getLevelUpTree = async () => {

    if (Object.keys(this.state.treeUserParent || {}).length <= 0) {
      return null
    }

    const {
      wiseWinAccount
    } = this.props;

    const wiseWinUserId = wiseWinAccount?.user_id;
    const treeUserParentUserId = this.state.treeUserParent?.user_id;
    const treeUserParentParentId = this.state.tree?.user?.user_binary_parent_id;

    if (+wiseWinUserId === +treeUserParentUserId) {
      return null
    }

    this.setState({ isLoadTree: true });

    const accountWiseWin = await agentWiseWin(`${ urls.getWiseWinAccount }${ treeUserParentParentId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });
    const tree = await this._getFirstBinnaryForUser(treeUserParentParentId, {}, 0, wiseWinUserId);

    this.setState({
      tree,
      treeUserParent: accountWiseWin,
      isLoadTree: false
    });
  }
  _getFirstBinnaryForUser = async ( userId, tree, level, parentId ) => {
    let newTree = {...tree};

    const data = Boolean(userId) ? await agentWiseWin.get(`/sync-api/streamdesk/first_binnary?user_id=${ userId }&parent_id=${ parentId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    }) : {};

    newTree = {
      ...newTree,
      user: data
    };

    if ( level < 3 ) {
      newTree.children = [];

      const responseLeft = await this._getFirstBinnaryForUser(data?.left_member?.id, {...newTree}, level + 1, parentId);
      const responseRight = await this._getFirstBinnaryForUser(data?.right_member?.id, {...newTree}, level + 1, parentId);

      const userLeft = {
        ...(data?.left_member || {}),
        ...responseLeft
      };
      const userRight = {
        ...(data?.right_member || {}),
        ...responseRight
      };

      newTree.children = [
        userLeft,
        userRight
      ];

      return newTree
    }

    return newTree
  }



  openPopUpLink = (user) => {
    this.refPopUpQrCode.current.open({
      data: user?.code
    });
  }

  _headerRenderRight = () => {
    if (this.state.activeTab === "referrals") {
      return null
    }

    return (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.buttonHeader} activeOpacity={0.8} onPress={this.getMyTree}>
          <CommonArrowsTopIcon/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHeader} activeOpacity={0.8} onPress={this.getLevelUpTree}>
          <CommonArrowsSingleTop/>
        </TouchableOpacity>
      </View>
    )

  }

  render() {
    const {
      search,
      activeTab,

      referralList,
      tree,
      treeUserParent,
      isLoadTree
    } = this.state;
    const {
      account,
      wiseWinAccount
    } = this.props;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.accountMyTeam.headerTitle)}
          rightContent={Boolean(activeTab === "wood") ? this._headerRenderRight : null}

          styleRightContent={{width: "auto"}}
        />

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

          <ControlsComponent
            search={search}
            activeTab={activeTab}

            onChangeSearch={this.onChangeSearch}
            onChangeActiveTab={this.onChangeActiveTab}
          />

          <View style={{ marginTop: 12 }}/>

          {

            Boolean( activeTab === "wood" ) && (
              <>

                <UserCardComponent
                  wiseWinAccount={Boolean(Object.keys(treeUserParent || {}).length > 0) ? treeUserParent : wiseWinAccount}
                />

                <ReferralTreeComponent
                  tree={tree}
                  account={account}
                  wiseWinAccount={wiseWinAccount}

                  isLoading={isLoadTree}

                  getTreeChild={this.getTreeChild}

                  openPopUpLink={this.openPopUpLink}
                />

              </>
            )

          }

          {

            Boolean(activeTab === "referrals") && (
              <>

                <UserCardComponent
                  account={account}
                  wiseWinAccount={wiseWinAccount}
                />

                <View style={{ marginTop: 12 }}/>

                <MyReferralsComponent
                  data={referralList}
                />

              </>
            )

          }

        </ScrollView>


        <PopUpQrCode
          ref={this.refPopUpQrCode}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  headerRight: {
    flexDirection: "row",
    marginLeft: -30,
    marginRight: -20
  },
  buttonHeader: {
    marginLeft: 12,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AccountMyTeam;
