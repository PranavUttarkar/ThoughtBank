import React from "react";
import { View, StyleSheet } from "react-native";
// import ThoughtBank3D from "./ThoughtBank3D";
// import LoginForm from "./LoginForm";

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.threeDContainer}>
        <ThoughtBank3D />
      </View>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  threeDContainer: { flex: 2 },
  formContainer: { flex: 1, padding: 20 },
});

export default LandingPage;
