import React, { useState } from 'react';
import { Text, Alert, TouchableOpacity, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        if (!emailOrUsername || !password) {
            Alert.alert("Error", "Please fill in both email/username and password.");
            return;
        }
        Alert.alert("Welcome Back", `${emailOrUsername}`);
        navigation.navigate('Home');
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    const handleresetpassword = () => {
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
                        />
                        <EyeIconWrapper onPress={() => setPasswordVisible(!isPasswordVisible)}>
                            <MaterialIcons 
                                name={isPasswordVisible ? "visibility-off" : "visibility"} 
                                size={22} 
                                color="#707070" 
                            />
                        </EyeIconWrapper>
                    </PasswordInputWrapper>
                </InputWrapper>

                <ForgotPasswordText onPress={handleresetpassword}>Forgot password?</ForgotPasswordText>

                <LoginButton onPress={handleLogin}>
                    <ButtonText>Log in</ButtonText>
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
