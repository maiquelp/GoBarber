import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  FiUser, FiMail, FiLock, FiArrowLeft,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Background, Container, Content, AnimationContainer,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Fill your name'),
        email: Yup.string().required('Fill your e-mail').email('Fill a valid e-mail'),
        password: Yup.string().min(6, 'Your password should have at least 6 characters'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Sign up created',
        description: 'Now you can logon!',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Sign up error',
        description: 'Sign up error, try again!',
      });
    }
  }, [history, addToast]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <Input name="name" placeholder="Name" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input name="password" type="password" placeholder="Password" icon={FiLock} />
            <Button type="submit">Sign Up</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Go back to login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
