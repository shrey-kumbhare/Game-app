import { StyleSheet, Text, View, PermissionsAndroid, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ route }) {
  // const { title, description, image, id } = route.params;
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, SetStepCount] = useState(0);

  var Dist = stepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);

  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: "Activity Recognition Permission",
          message: "This app needs access to your physical activity to count steps.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Activity recognition permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    subscribe();
    requestPermission();
  }, []);

  useEffect(() => {
    const getSavedStepCount = async () => {
      const savedCount = await AsyncStorage.getItem('dailyStepCount');
      if (savedCount) {
        SetStepCount(parseInt(savedCount));
      }
    };

    const subscription = Pedometer.watchStepCount(result => {
      SetStepCount(result.steps);
      AsyncStorage.setItem('dailyStepCount', result.steps.toString());
    });

    const resetStepCount = () => {
      SetStepCount(0);
      AsyncStorage.setItem('dailyStepCount', '0');
    };

    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    const intervalId = setInterval(resetStepCount, timeUntilMidnight);

    getSavedStepCount();

    return () => {
      subscription.remove();
      clearInterval(intervalId);
    };
  }, []);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 120, alignContent: "center" }}>
      <View style={{ marginLeft: 30, marginBottom: 40, marginTop: 60 }}>
        <CircularProgress
          value={stepCount}
          maxValue={6500}
          radius={150}
          textColor={"#ECF0F1"}
          activeStrokeColor={"#8A2BE2"}
          inActiveStrokeColor={"rgb(70,130,180)"}
          inActiveStrokeOpacity={1}
          inActiveStrokeWidth={30}
          activeStrokeWidth={30}
          title={"Step Count"}
          titleColor={"#ECF0F1"}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.textDesignAvailable}>
            Pedometer available : {PedometerAvailability}{" "}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textDesign}>Target : 6500 steps (5KMS)</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textDesign}>
            Distance Covered : {DistanceCovered} kms
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textDesign}>
            Calories Burned : {caloriesBurnt}
          </Text>
        </View>
        {/* <View style={styles.textContainer}>
          <Text style={styles.textDesign}>Title: {title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textDesign}>Description: {description}</Text>
        </View> */}
        {/* <View style={styles.textContainer}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadingTitle: {
    color: "white",
    backgroundColor: "rgba(70,130,180, 0.5)",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textDesign: {
    backgroundColor: "rgba(70,130,180,0.5)",
    height: 50,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    padding: 10,
    paddingRight: 30,
  },
  textDesignAvailable: {
    backgroundColor: "rgba(0,0,139, 0.03)",
    height: 45,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    padding: 10,
    paddingRight: 30,
    marginLeft: 50,
  },
  textContainer: {
    margin: 10,
    width: "100%",
  },
});
