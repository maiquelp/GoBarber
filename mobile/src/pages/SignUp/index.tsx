import React, { useRef } from 'react';

import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, TextInput, View, ScrollView} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

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
              <Title>Create your account</Title>
            </View>
            <Form ref={formRef} onSubmit={(data) => {}}>
              <Input name="name" icon="user"  placeholder="Name" autoCapitalize="words" returnKeyType="next"
                onSubmitEditing={() => inputEmailRef.current?.focus()} blurOnSubmit={false}
              />
              <Input ref={inputEmailRef} name="email" icon="mail"  placeholder="E-mail" keyboardType="email-address"
                autoCorrect={false} autoCapitalize="none" returnKeyType="next" blurOnSubmit={false}
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />
              <Input ref={inputPasswordRef} name="password" icon="lock"  placeholder="Password" secureTextEntry
                textContentType="newPassword" returnKeyType="send" onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Sign up</Button>
            </Form>
          </Container>
        </ScrollView>

        <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
          <Icon name= "arrow-left" size={20} color="#fff" />
          <BackToSignInText>Back to logon</BackToSignInText>
        </BackToSignIn>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;
