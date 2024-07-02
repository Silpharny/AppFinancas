import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={SignIn}
      />
      <AuthStack.Screen
        name="SignUp"
        options={{
          headerStyle: {
            backgroundColor: "#3b3bdf",
            borderBottomWidth: 1,
            borderBottomColor: "#00b94a",
          },
          headerTintColor: "#fff",
          headerTitle: "Voltar",
          headerBackTitleVisible: false,
        }}
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
}
