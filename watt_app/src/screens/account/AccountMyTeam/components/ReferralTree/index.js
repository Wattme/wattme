import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import agentWiseWin from "../../../../../agent/agentWiseWin";

import CardUser from "./CardUser";
import CardCommand from "./CardCommand";
import CardUserSmall from "./CardUserSmall";


class ReferralTree extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tree: {}
    };
  }


  render() {
    const {
      tree,
      isLoading,

      getTreeChild
    } = this.props;


    if (isLoading) {
      return (
        <View style={[styles.card, styles.cardLoading]}>

          <Text style={styles.cardLoadingMessage}>
            {allTranslations(localization.accountMyTeam.referralTree.messageLoading)}
          </Text>

          <View style={[styles.cartLineTop, {left: 64}]}/>
          <View style={[styles.cartLineTop, {right: 64}]}/>
        </View>
      )

    }

    return (
      <>

        {/* Линия веток (Левая / Правая) */}
        <View style={styles.row}>
          <CardCommand
            title={allTranslations(localization.accountMyTeam.referralTree.leftCommand)}
            participants={tree?.user?.left_count || 0}
            points={tree?.user?.left_balls || 0}
          />
          <CardCommand
            title={allTranslations(localization.accountMyTeam.referralTree.rightCommand)}
            participants={tree?.user?.right_count || 0}
            points={tree?.user?.right_balls || 0}
          />
        </View>


        {/* Реферальное дерево */}
        <View style={styles.row}>
          {(tree?.children || []).map(( child, index ) => (
            <View key={`referral-tree-level-1-${ index }`} style={{flex: 1}}>
              {/* Родитель 1 уровня */}
              <View>
                <View key={`tree-${ index }-level-1`} style={[styles.card]}>
                  <TouchableOpacity activeOpacity={0.8} disabled={Boolean(!child.id)} onPress={() => getTreeChild(child.id)}>
                    <CardUser
                      user={child || {}}
                      openPopUpLink={this.props.openPopUpLink}
                    />
                  </TouchableOpacity>
                  <View style={styles.cartLineTop}/>
                </View>
              </View>

              {/* Родители 2 уровеня */}
              <View style={[styles.row, {marginLeft: 0}]}>
                {
                  (child?.children || []).map((child2, index2) => (
                    <View key={`tree-${ index2 }-${ index }-level-2`} style={[styles.card]}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={Boolean(!child2.id)}
                        onPress={() => getTreeChild(child2.id)}
                      >
                        <CardUserSmall
                          user={child2}
                          getTreeChild={getTreeChild}
                          openPopUpLink={this.props.openPopUpLink}
                        />
                      </TouchableOpacity>
                      <View style={styles.cartLineTop}/>
                    </View>
                  ))
                }
              </View>
            </View>
          ))}
        </View>



        {/* Нижние участиники */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={() => getTreeChild(tree?.user?.left_last_member?.id)} disabled={!Boolean(tree?.user?.left_last_member?.id)}>
            <Text style={styles.cardEndLabel}>
              { allTranslations(localization.accountMyTeam.referralTree.lowerLeftParticipant) }
            </Text>
            <CardUser
              user={tree?.user?.left_last_member}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => getTreeChild(tree?.user?.right_last_member?.id)} disabled={!Boolean(tree?.user?.right_last_member?.id)}>
            <Text style={styles.cardEndLabel}>
              { allTranslations(localization.accountMyTeam.referralTree.lowerRightParticipant) }
            </Text>
            <CardUser
              user={tree?.user?.right_last_member}
            />
          </TouchableOpacity>
        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({

  cardLoading: {
    marginLeft: 0,
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 24
  },
  cardLoadingMessage: {
     fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    fontWeight: "500",
    color: "#282828"
  },


  row: {
    flexDirection: "row",
    marginLeft: -12,
    marginTop: 12
  },

  card: {
    flex: 1,
    marginLeft: 12,
    padding: 12,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "#FFFFFF"
  },


  cardBig: {
    padding: 16
  },
  cardBigTitle: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontWeight: "500",
    color: "black",
    marginBottom: 12
  },
  cardBigBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardBigBodyLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    fontWeight: "300"
  },
  cardBigBodyValue: {
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8
  },

  cartLineTop: {
    position: "absolute",
    height: 14,
    top: -14,
    alignSelf: "center",

    backgroundColor: "#8E8E8E",
    width: 2
  },

  cardEndLabel: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    color: "#282828",

    marginBottom: 12
  }

});

export default ReferralTree
