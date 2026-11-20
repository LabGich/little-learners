
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fade, scale, float]);

  const floatY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <View style={styles.container}>
      <View style={styles.topDecor}>
        <Text style={styles.star}>✦</Text>
        <Text style={styles.smallStar}>✧</Text>
        <Text style={styles.sun}>☀️</Text>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoCircle,
            { transform: [{ translateY: floatY }] },
          ]}
        >
          <Text style={styles.logoEmoji}>📚</Text>
          <Text style={styles.logoLetters}>A B C</Text>
        </Animated.View>

        <Text style={styles.title}>
          Little <Text style={styles.titleAccent}>Learners</Text>
        </Text>

        <Text style={styles.subtitle}>
          Big discoveries start small!
        </Text>

        <Text style={styles.description}>
          A happy little world where children learn,
          play and grow every day.
        </Text>

        <View style={styles.activities}>
          <View style={[styles.activity, { backgroundColor: '#E4F2FF' }]}>
            <Text style={styles.activityEmoji}>🔤</Text>
            <Text style={styles.activityLabel}>Letters</Text>
          </View>

          <View style={[styles.activity, { backgroundColor: '#E5F6DF' }]}>
            <Text style={styles.activityEmoji}>🔢</Text>
            <Text style={styles.activityLabel}>Numbers</Text>
          </View>

          <View style={[styles.activity, { backgroundColor: '#FFE8E9' }]}>
            <Text style={styles.activityEmoji}>🔬</Text>
            <Text style={styles.activityLabel}>Discovery</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.replace('/(tabs)')}
          accessibilityRole="button"
          accessibilityLabel="Start learning"
        >
          <Text style={styles.buttonText}>Let's Start</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>

        <Text style={styles.encouragement}>
          Every little step is a big achievement! ⭐
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ by <Text style={styles.brand}>LabGich</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5DF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  topDecor: {
    position: 'absolute',
    top: 45,
    right: 28,
    left: 28,
    height: 70,
  },
  star: {
    position: 'absolute',
    left: 10,
    top: 5,
    fontSize: 36,
    color: '#F3B83F',
  },
  smallStar: {
    position: 'absolute',
    left: '45%',
    top: 0,
    fontSize: 28,
    color: '#F08B69',
  },
  sun: {
    position: 'absolute',
    right: 5,
    top: 8,
    fontSize: 38,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  logoCircle: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#F7D78E',
    marginBottom: 25,
    elevation: 5,
  },
  logoEmoji: {
    fontSize: 65,
  },
  logoLetters: {
    fontSize: 15,
    fontWeight: '900',
    color: '#526A9B',
    letterSpacing: 4,
    marginTop: -4,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#334A73',
    textAlign: 'center',
    letterSpacing: -1,
  },
  titleAccent: {
    color: '#F09A42',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E58D43',
    marginTop: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#68758A',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 300,
  },
  activities: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 13,
    marginTop: 30,
    marginBottom: 32,
  },
  activity: {
    width: 88,
    height: 91,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmoji: {
    fontSize: 31,
  },
  activityLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#52617A',
    marginTop: 5,
  },
  button: {
    width: '85%',
    maxWidth: 320,
    height: 58,
    backgroundColor: '#F19A43',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  buttonArrow: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  encouragement: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B806F',
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#8B806F',
    fontWeight: '600',
  },
  brand: {
    color: '#E58D43',
    fontWeight: '900',
  },
});
