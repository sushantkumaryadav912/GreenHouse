import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (!currentPassword) {
      Alert.alert('Error', 'Please enter your current password.');
      return;
    }
    if (!newPassword) {
      Alert.alert('Error', 'Please enter your new password.');
      return;
    }
    if (!confirmPassword) {
      Alert.alert('Error', 'Please confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Password has been reset successfully.');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container>
      <FormWrapper>
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
          <Label>Current Password</Label>
          <PasswordInputWrapper>
            <StyledTextInput
              placeholder="Enter your current password"
              secureTextEntry={!isCurrentPasswordVisible}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={{ flex: 1 }}
            />
            <EyeIconWrapper onPress={() => setCurrentPasswordVisible(!isCurrentPasswordVisible)}>
              <MaterialIcons name={isCurrentPasswordVisible ? "visibility-off" : "visibility"} size={22} color="#707070" />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>New Password</Label>
          <PasswordInputWrapper>
            <StyledTextInput
              placeholder="Enter your new password"
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ flex: 1 }}
            />
            <EyeIconWrapper onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}>
              <MaterialIcons name={isNewPasswordVisible ? "visibility-off" : "visibility"} size={22} color="#707070" />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <InputWrapper>
          <Label>Confirm Password</Label>
          <PasswordInputWrapper>
            <StyledTextInput
              placeholder="Confirm your new password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{ flex: 1 }}
            />
            <EyeIconWrapper onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <MaterialIcons name={isConfirmPasswordVisible ? "visibility-off" : "visibility"} size={22} color="#707070" />
            </EyeIconWrapper>
          </PasswordInputWrapper>
        </InputWrapper>

        <ResetButton onPress={handleResetPassword}>
          <ButtonText>Reset Password</ButtonText>
        </ResetButton>
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

const ResetButton = styled.TouchableOpacity`
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

export default ResetPasswordScreen;
