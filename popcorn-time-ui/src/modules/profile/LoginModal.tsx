import React from 'react';

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Group,
  Button,
  Modal,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/hooks';
import { useMutateToken } from '../../api/user';
import { useSessionStore } from '../../lib/Stores';

export interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const setJwt = useSessionStore((state) => state.setJwt);

  const { mutate } = useMutateToken();

  const loginMutation = (values: object) => {
    mutate(values, {
      onSuccess: (d) => {
        showNotification({
          title: 'Success',
          message: 'Welcome back!',
        });

        setJwt(d.data.access);
        onClose();
        form.reset();
      },
      onError: () => {
        showNotification({
          title: 'Error',
          message: 'Error',
        });
      },
    });
  };

  return (
    <>
      <Modal
        onClose={() => onClose()}
        title="Login"
        centered
        closeOnClickOutside={false}
        opened={visible}
      >
        <form onSubmit={form.onSubmit((values) => loginMutation(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="username"
              placeholder="username1"
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;
