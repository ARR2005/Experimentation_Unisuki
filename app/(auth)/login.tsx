import { SignInForm } from "@/components/sign-in-form";
import React from "react";
import {
  Image,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top"]}
      className="bg-white dark:bg-dark"
    >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/icons/Splash_Logo.png")}
            className="w-64 h-64"
            resizeMode="contain"
          />
          <View className="w-full">
            <SignInForm />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
