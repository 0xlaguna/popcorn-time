import { useState } from 'react';

// helpers
import { isNil } from 'ramda';

// mantine
import { Modal, Button, Group, TextInput, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/hooks';

import { ICreateMovie } from '../../../../interfaces/movies';
import { useMutateMovie } from '../../../../api/movies';

// stores
import { useSessionStore } from '../../../../lib/Stores';

export interface AddMovieProps {
  updateData: () => void;
}

export const AddMovie = ({ updateData }: AddMovieProps) => {
  const [opened, setOpened] = useState(false);
  const { mutate } = useMutateMovie();

  const jwt = useSessionStore((state) => state.jwt);

  const form = useForm({
    initialValues: {
      title: '',
      genre: '',
      plot: '',
      cover: '',
      year: '',
      runtime: '00',
    },
  });

  const addMutation = (values: ICreateMovie) => {
    mutate(values, {
      onSuccess: () => {
        showNotification({
          title: 'Success',
          message: 'The movie was created',
        });
        updateData();
        setOpened(false);
        form.reset();
      },
      onError: () => {
        showNotification({
          title: 'Error',
          message: 'There was an error when trying to add a movie',
        });
      },
    });
  };

  return (
    <>
      <Modal
        centered
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a New Movie!"
      >
        <form onSubmit={form.onSubmit((values) => addMutation(values))}>
          <TextInput
            required
            label="Title"
            placeholder="The great villain"
            {...form.getInputProps('title')}
          />

          <TextInput
            required
            label="Genre"
            placeholder="action, comedy"
            {...form.getInputProps('genre')}
          />

          <Textarea
            required
            placeholder="when the great villain started gifting bullets..."
            label="Plot"
            {...form.getInputProps('plot')}
          />

          <TextInput
            required
            label="Image cover"
            placeholder="https://google.com/imgs/movie1.png"
            {...form.getInputProps('cover')}
          />

          <TextInput required label="Release" placeholder="2022" {...form.getInputProps('year')} />

          <TextInput
            required
            label="Runtime"
            placeholder="2:34"
            {...form.getInputProps('runtime')}
          />

          <Button type="submit">Add</Button>
        </form>
      </Modal>

      {!isNil(jwt) && (
        <Group position="center">
          <Button onClick={() => setOpened(true)}>Add new Movie!</Button>
        </Group>
      )}
    </>
  );
};
