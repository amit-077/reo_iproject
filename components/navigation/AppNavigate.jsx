import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import Profile from "../../screens/Profile";
import Videos from "../../screens/Videos";
import { StatusBar } from "native-base";

const Stack = createNativeStackNavigator();

function AppNavigate() {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Videos" component={Videos} />
    </Stack.Navigator>
  );
}

export default AppNavigate;
