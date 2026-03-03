import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Defined locally to avoid any cross-file type resolution issues
interface HandlerCurrencyProps {
  onSwap: () => void;
}

const HandlerCurrency: React.FC<HandlerCurrencyProps> = ({ onSwap }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
    onSwap();
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.7}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialCommunityIcons name="swap-vertical" size={22} color="#a78bfa" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -4,
    zIndex: 10,
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default HandlerCurrency;