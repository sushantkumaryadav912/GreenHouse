import React, { useState } from 'react';
import { Text, Alert, TouchableOpacity, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebaseConfig.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert('Error', 'Please fill in both email/username and password.');
      return;
    }

    setIsLoading(true);
    try {
      let email = emailOrUsername;

      // If input is a username, fetch the email from Firestore
      if (!emailOrUsername.includes('@')) {
        const q = query(
          collection(db, 'users'),
          where('username', '==', emailOrUsername)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          Alert.alert('Error', 'No user found with this username.');
          setIsLoading(false);
          return;
        }
        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email; // Get the email associated with the username
      }

      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore to confirm and display
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        Alert.alert('Welcome Back', `Logged in as ${userData.username}`);
      } else {
        Alert.alert('Error', 'User data not found in Firestore.');
      }

      navigation.navigate('Home');
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <Container>
      <FormWrapper>
        <InputWrapper>
          <Label>Email or Username</Label>
          <StyledTextInput
            placeholder="Enter your email or username"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            autoCapitalize="none"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Password</Label>
          <PasswordInputWrapper>
            <StyledTextInput
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              style={{ flex: 1 }}
              autoCapitalize="none"
            />
            <EyeIconWrapper onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <MaterialIcons
                name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={22}
                color="#707070"
              />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <ForgotPasswordText onPress={handleResetPassword}>Forgot password?</ForgotPasswordText>

        <LoginButton onPress={handleLogin} disabled={isLoading}>
          <ButtonText>{isLoading ? 'Logging in...' : 'Log in'}</ButtonText>
        </LoginButton>

        <SignUpWrapper>
          <SignUpText>Don't have an account? </SignUpText>
          <SignUpLinkText onPress={handleSignup}>Sign up</SignUpLinkText>
        </SignUpWrapper>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
`;

const FormWrapper = styled.View`
  width: 100%;
  max-width: 300px;
`;

const InputWrapper = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  color: #58bc82;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PasswordInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EyeIconWrapper = styled.TouchableOpacity`
  padding: 10px;
`;

const StyledTextInput = styled.TextInput`
  background-color: #ececec;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #707070;
  color: #333;
`;

const ForgotPasswordText = styled.Text`
  color: #58bc82;
  text-align: right;
  margin-top: -8px;
  margin-bottom: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #707070;
  padding: 16px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const SignUpWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
`;

const SignUpText = styled.Text`
  color: #333;
`;

const SignUpLinkText = styled.Text`
  color: #58bc82;
  font-weight: bold;
`;

export default LoginScreen;