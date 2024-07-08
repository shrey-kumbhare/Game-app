import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const GameCard = ({ data: { title, description, image } }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
        style={styles.touchableContainer}
      >
        <Image
          source={{ uri: image }}
          style={styles.thumbnailImage}
          resizeMode="cover"
        />

        <Image
          style={styles.playIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  imageContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'yellow', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    gap: 4,
  },
  titleText: {
    fontFamily: 'psemibold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  touchableContainer: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginTop: 3,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
});

export default GameCard;
