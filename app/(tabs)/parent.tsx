
import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import {
  Card,
  C,
  PrimaryButton,
  styles,
} from '../../src/components/ui';

import {
  getAge,
  getChildName,
  getLanguage,
  setAge,
  setChildName,
  setLanguage,
  clearProgress,
  getProgress,
} from '../../src/lib/storage';

import { strings } from '../../src/i18n/strings';

import {
  cloudConfigured,
  confirmParentCode,
  requestParentCode,
  signOutParent,
  syncProgressToCloud,
  supabase,
} from '../../src/lib/cloud';

import { parentStyles } from '../styles/parent.styles';

export default function Parent() {
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [name, setName] = useState('Superstar');
  const [age, setAgeValue] = useState(6);
  const [gate, setGate] = useState(false);
  const [answer, setAnswer] = useState('');
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [cloudBusy, setCloudBusy] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      (async () => {
        const [language, childName, childAge, progress] =
          await Promise.all([
            getLanguage(),
            getChildName(),
            getAge(),
            getProgress(),
          ]);

        if (active) {
          setLang(language);
          setName(childName);
          setAgeValue(childAge);
          setCount(progress.length);

          if (supabase) {
            const session = await supabase.auth.getSession();

            if (active) {
              setSignedIn(Boolean(session.data.session));
            }
          }
        }
      })().catch(() => {});

      return () => {
        active = false;
      };
    }, [])
  );

  const t = strings[lang];

  const unlock = () => {
    if (answer.trim() === '5') {
      setGate(true);
      setAnswer('');
    } else {
      Alert.alert(
        lang === 'en' ? 'Try again' : 'Jaribu tena',
        lang === 'en'
          ? 'Solve 2 + 3 to enter the parent area.'
          : 'Jibu 2 + 3 ili kuingia sehemu ya mzazi.'
      );
      setAnswer('');
    }
  };

  const save = async () => {
    await Promise.all([
      setLanguage(lang),
      setChildName(name.trim() || 'Superstar'),
      setAge(age),
    ]);

    Alert.alert(
      lang === 'en' ? 'Saved' : 'Imehifadhiwa',
      lang === 'en'
        ? 'Your settings have been saved on this device.'
        : 'Mipangilio yako imehifadhiwa kwenye kifaa hiki.'
    );
  };

  const reset = () =>
    Alert.alert(
      lang === 'en' ? 'Reset progress?' : 'Futa maendeleo?',
      lang === 'en'
        ? 'This removes saved lesson scores from this device.'
        : 'Hii itafuta alama za masomo kwenye kifaa hiki.',
      [
        {
          text: lang === 'en' ? 'Cancel' : 'Ghairi',
          style: 'cancel',
        },
        {
          text: lang === 'en' ? 'Reset' : 'Futa',
          style: 'destructive',
          onPress: async () => {
            await clearProgress();
            setCount(0);
            Alert.alert(
              lang === 'en' ? 'Done' : 'Imekamilika'
            );
          },
        },
      ]
    );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>{t.parentTitle}</Text>
      <Text style={styles.body}>{t.parentDesc}</Text>

      {!gate ? (
        <Card>
          <Text style={parentStyles.icon}>🔐</Text>

          <Text style={parentStyles.cardTitle}>
            {lang === 'en'
              ? 'Parent check'
              : 'Uthibitisho wa mzazi'}
          </Text>

          <Text style={styles.body}>
            {lang === 'en'
              ? 'Answer this simple question to open settings: 2 + 3 = ?'
              : 'Jibu swali hili rahisi kufungua mipangilio: 2 + 3 = ?'}
          </Text>

          <TextInput
            value={answer}
            onChangeText={setAnswer}
            keyboardType="number-pad"
            placeholder="?"
            style={parentStyles.answerInput}
          />

          <PrimaryButton
            title={lang === 'en' ? 'Continue' : 'Endelea'}
            onPress={unlock}
          />
        </Card>
      ) : (
        <>
          {/* Child profile */}
          <Card>
            <Text style={parentStyles.cardTitle}>
              {lang === 'en'
                ? 'Child profile'
                : 'Wasifu wa mtoto'}
            </Text>

            <Text style={parentStyles.fieldLabel}>
              {t.childName}
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Child's name"
              style={parentStyles.input}
            />

            <Text style={parentStyles.fieldLabel}>
              {t.age}
            </Text>

            <View style={parentStyles.choiceRow}>
              {[6, 7, 8].map((n) => (
                <Pressable
                  key={n}
                  onPress={() => setAgeValue(n)}
                  style={[
                    parentStyles.choice,
                    age === n && parentStyles.choiceSelected,
                  ]}
                >
                  <Text
                    style={[
                      parentStyles.choiceText,
                      age === n &&
                        parentStyles.choiceTextSelected,
                    ]}
                  >
                    {n}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={parentStyles.fieldLabel}>
              {t.language}
            </Text>

            <View style={parentStyles.choiceRow}>
              {(['en', 'sw'] as const).map((language) => (
                <Pressable
                  key={language}
                  onPress={() => setLang(language)}
                  style={[
                    parentStyles.choice,
                    parentStyles.languageChoice,
                    lang === language &&
                      parentStyles.choiceSelected,
                  ]}
                >
                  <Text
                    style={[
                      parentStyles.languageText,
                      lang === language &&
                        parentStyles.choiceTextSelected,
                    ]}
                  >
                    {language === 'en'
                      ? 'English'
                      : 'Kiswahili'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <PrimaryButton
              title={t.save}
              onPress={save}
            />
          </Card>

          {/* Cloud backup */}
          <Card>
            <Text style={parentStyles.sectionTitle}>
              ☁️{' '}
              {lang === 'en'
                ? 'Online backup'
                : 'Hifadhi ya mtandaoni'}
            </Text>

            {!cloudConfigured ? (
              <Text style={styles.body}>
                {lang === 'en'
                  ? 'Cloud backup is ready to connect. Add your Supabase project URL and public key to the .env file, then restart the app. See supabase-schema.sql.'
                  : 'Hifadhi ya mtandaoni iko tayari kuunganishwa. Weka URL na ufunguo wa Supabase kwenye faili la .env, kisha washa programu upya.'}
              </Text>
            ) : (
              <>
                {!signedIn ? (
                  <>
                    <Text style={styles.body}>
                      {lang === 'en'
                        ? 'A parent can sign in using a one-time email code.'
                        : 'Mzazi anaweza kuingia kwa kutumia msimbo wa mara moja wa barua pepe.'}
                    </Text>

                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder="Parent email"
                      style={parentStyles.input}
                    />

                    <PrimaryButton
                      title={
                        lang === 'en'
                          ? 'Send sign-in code'
                          : 'Tuma msimbo'
                      }
                      disabled={!email.includes('@') || cloudBusy}
                      onPress={async () => {
                        try {
                          setCloudBusy(true);
                          await requestParentCode(email);

                          Alert.alert(
                            lang === 'en'
                              ? 'Check your email'
                              : 'Angalia barua pepe',
                            'A sign-in code has been sent.'
                          );
                        } catch (e) {
                          Alert.alert(
                            'Sign-in error',
                            e instanceof Error
                              ? e.message
                              : 'Please try again.'
                          );
                        } finally {
                          setCloudBusy(false);
                        }
                      }}
                    />

                    <TextInput
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      placeholder="6-digit email code"
                      style={parentStyles.input}
                    />

                    <PrimaryButton
                      title={
                        lang === 'en'
                          ? 'Verify code'
                          : 'Thibitisha msimbo'
                      }
                      disabled={otp.trim().length < 6 || cloudBusy}
                      onPress={async () => {
                        try {
                          setCloudBusy(true);
                          await confirmParentCode(email, otp);
                          setSignedIn(true);

                          Alert.alert(
                            'Signed in',
                            'Parent account connected.'
                          );
                        } catch (e) {
                          Alert.alert(
                            'Verification error',
                            e instanceof Error
                              ? e.message
                              : 'Please try again.'
                          );
                        } finally {
                          setCloudBusy(false);
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.body}>
                      {lang === 'en'
                        ? 'Parent account connected. Sync your saved lesson scores when online.'
                        : 'Akaunti ya mzazi imeunganishwa. Sawazisha alama zako ukiwa mtandaoni.'}
                    </Text>

                    <PrimaryButton
                      title={
                        lang === 'en'
                          ? 'Sync progress now'
                          : 'Sawazisha maendeleo'
                      }
                      disabled={cloudBusy}
                      onPress={async () => {
                        try {
                          setCloudBusy(true);
                          const uploaded = await syncProgressToCloud();

                          Alert.alert(
                            lang === 'en'
                              ? 'Sync complete'
                              : 'Usawazishaji umekamilika',
                            `${uploaded} ${
                              lang === 'en'
                                ? 'lesson records uploaded.'
                                : 'rekodi za masomo zimepakiwa.'
                            }`
                          );
                        } catch (e) {
                          Alert.alert(
                            'Sync error',
                            e instanceof Error
                              ? e.message
                              : 'Please try again.'
                          );
                        } finally {
                          setCloudBusy(false);
                        }
                      }}
                    />

                    <Pressable
                      onPress={async () => {
                        await signOutParent();
                        setSignedIn(false);
                      }}
                    >
                      <Text style={parentStyles.signOut}>
                        Sign out
                      </Text>
                    </Pressable>
                  </>
                )}
              </>
            )}
          </Card>

          {/* Learning overview */}
          <Card>
            <Text style={parentStyles.sectionTitle}>
              {lang === 'en'
                ? 'Learning overview'
                : 'Muhtasari wa masomo'}
            </Text>

            <Text style={styles.body}>
              {count} {t.completed}
            </Text>

            <Text style={styles.body}>{t.privacy}</Text>

            <Pressable
              onPress={reset}
              style={parentStyles.resetButton}
            >
              <Text style={parentStyles.resetText}>
                {t.reset}
              </Text>
            </Pressable>
          </Card>

          <Pressable onPress={() => setGate(false)}>
            <Text style={parentStyles.lockText}>
              🔒{' '}
              {lang === 'en'
                ? 'Lock parent area'
                : 'Funga sehemu ya mzazi'}
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}
