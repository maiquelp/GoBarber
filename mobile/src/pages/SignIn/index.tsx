import React, { useCallback, useRef } from 'react';

import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert  } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup  from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Fill your e-mail').email('Fill a valid e-mail'),
        password: Yup.string().required('Fill your password'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Authentication error',
        'Login error, check your credentials'
      );
    }
  }, [signIn]);

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
