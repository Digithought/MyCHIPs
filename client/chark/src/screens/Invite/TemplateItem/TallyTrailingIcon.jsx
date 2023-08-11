import React, { useState } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { TimerIcon, WarningIcon } from "../../../components/SvgAssets/SvgAssets"
import Tooltip from "react-native-walkthrough-tooltip";

export const TallyTrainingIcon = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const tallyContent = tallyContents[props.status];

  const onPress = () => {
    setIsVisible(!isVisible);
  }

  if (tallyContent) {
    return <Tooltip
      isVisible={isVisible}
      content={
        <Text>{tallyContent.message}</Text>
      }
      placement="top"
      onClose={onPress}
      contentStyle={[styles.contentStyle]}
      tooltipStyle={{}}
      childrenWrapperStyle={{ opacity: 0 }}
      // backgroundColor="transparent"
    >
      <TouchableOpacity style={[styles.touchable, props.style]} onPress={onPress}>
        {tallyContent.icon}
      </TouchableOpacity>
    </Tooltip >
  }
  return <></>
}

const styles = StyleSheet.create({
  contentStyle: {
    maxWidth: 200,
  },
  touchable: {
    paddingHorizontal: 8,
    paddingBottom: 6,
    paddingTop: 2,
  }
})

const tallyContents = {
  "draft": { icon: <WarningIcon size={16} />, message: "Your prospective partner is waiting for you to act on this tally" },
  "offer": { icon: <TimerIcon size={16} />, message: "You are waiting on someone else before the tally is complete" },
}
