import { ActivityIndicator, Text, Pressable, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        containerStyles,
        isLoading && styles.loading,
        pressed && styles.pressed,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'grey',
    borderRadius: 15,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: 'primary',
    fontFamily: 'psemibold',
    fontSize: 18,
  },
  activityIndicator: {
    marginLeft: 8,
  },
});

export default CustomButton;
