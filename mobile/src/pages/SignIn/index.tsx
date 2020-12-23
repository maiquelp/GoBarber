import React, { useCallback, useRef } from 'react';

import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput  } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1}}>
          <Container>
            <Image source={logo} />
            <View>
              <Title>Do your login</Title>
            </View>

            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input name="email" icon="mail" placeholder="E-mail" autoCorrect={false}
                autoCapitalize="none" keyboardType="email-address" returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input ref={passwordInputRef} name="password" icon="lock"  placeholder="Password" secureTextEntry
                returnKeyType="send" onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => {
                formRef.current?.submitForm();
              }}>Logon</Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Forgot password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name= "log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Create account</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignIn;
