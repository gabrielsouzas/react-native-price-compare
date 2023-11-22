import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Home from '../pages/Home';
import List from '../pages/List';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#282829',
          borderTopWidth: 0,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: '#FFF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
          tabBarLabel: 'Um Produto',
        }}
      />

      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Lista',
        }}
      />
    </Tab.Navigator>
  );
}
