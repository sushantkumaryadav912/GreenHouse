import React, { useState } from 'react';
import { Text, Alert, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handlePhoneNumberChange = (text) => {
    if (/^\d{0,10}$/.test(text)) {
      setPhone(text);
    } else {
      Alert.alert("Error", "Phone number cannot exceed 10 digits.");
    }
  };

  const handleSignup = () => {
    if (!username) {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
    if (!phone) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", `Signed up as ${username}`);
  };

  return (
    <Container>
      <FormWrapper>
        <InputWrapper>
          <Label>Username</Label>
          <StyledTextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Email</Label>
          <StyledTextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Phone Number</Label>
          <PhoneInputWrapper>
            <CountryCodePicker>
              <Picker
                selectedValue={countryCode}
                onValueChange={(value) => setCountryCode(value)}
                style={{ height: 50, width: 110 }}
              >
                <Picker.Item label="+1 (USA)" value="+1" />
                <Picker.Item label="+91 (India)" value="+91" />
                <Picker.Item label="+44 (UK)" value="+44" />
                <Picker.Item label="+61 (Australia)" value="+61" />
                <Picker.Item label="+81 (Japan)" value="+81" />
              </Picker>
            </CountryCodePicker>
            <PhoneTextInput
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneNumberChange}
            />
          </PhoneInputWrapper>
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
            />
            <EyeIconWrapper onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <MaterialIcons name={isPasswordVisible ? "visibility-off" : "visibility"} size={24} color="#707070" />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Confirm Password</Label>
          <PasswordInputWrapper>
            <StyledTextInput
              placeholder="Confirm your password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{ flex: 1 }}
            />
            <EyeIconWrapper onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <MaterialIcons name={isConfirmPasswordVisible ? "visibility-off" : "visibility"} size={24} color="#707070" />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <SignupButton onPress={handleSignup}>
          <ButtonText>Sign up</ButtonText>
        </SignupButton>
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

const PhoneInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CountryCodePicker = styled.View`
  background-color: #ececec;
  border-radius: 8px;
  border: 1px solid #707070;
  justify-content: center;
`;

const PhoneTextInput = styled.TextInput`
  flex: 1;
  background-color: #ececec;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #707070;
  color: #333;
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

const SignupButton = styled.TouchableOpacity`
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

export default SignupScreen;
