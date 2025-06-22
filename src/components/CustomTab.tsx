import { View, Platform, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CustomTab:React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
          layout={LinearTransition.springify().mass(0.5)}
            onPress={onPress}
            style={[styles.tabButton, isFocused ? { backgroundColor: "lightgreen",borderRadius:999,paddingHorizontal:"2%" } : null]}
            key={state?.routes[index]?.key}
          >
            {getTabIconByRouteName(route.name)}
           {isFocused && <Animated.Text entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
            //  style={{ color: isFocused ? colors.primary : colors.text }}
            style={styles.tabButtonText}
             >
              {label as string}
            </Animated.Text>}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
}

const getTabIconByRouteName = (routeName: string) => {

  switch (routeName) {
    case 'Home':
      return <Image source={require('../images/home-inactive.png')} />
    case 'Doctor':
       return <Image source={require('../images/doctor-active.png')} />
    case 'Lab':
       return <Image source={require('../images/labs-active.png')} />
    case 'Pharmacy':
       return <Image source={require('../images/pharmacy.png')} />
    case 'Appointment':
      return <Image source={require('../images/appointment.png')} />
    default:
      return null;
  }
}

export default CustomTab

const styles =StyleSheet.create({
  container:{
    flexDirection: 'row',
    borderTopColor:"#E5E6E5",
    borderTopWidth:1,
    // backgroundColor:"red",
    borderLeftColor: "#E5E6E5",
    borderLeftWidth: 1,
    borderRightColor: "#E5E6E5",
    borderRightWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom:  Platform.OS === 'android' ? 0 : "2%",
    // paddingHorizontal:"1%",
    paddingVertical:"5%",
    justifyContent:"center",
    alignItems:"center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,  

  },
  tabButton:{
    flexDirection:"row",
    height: 40,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:"4%",
  },
  tabButtonText:
  {
    color:"#ffff",
    marginLeft:"5%",
    fontWeight:"500"

  }
})
