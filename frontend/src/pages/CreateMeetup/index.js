import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import DatePicker from '../../components/DatePicker';
import BannerInput from '../../components/BannerInput';

import api from '../../services/api';
import history from '../../services/history';

import { Container } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.string(),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
});

function CreateMeetup() {
  async function handleSubmit({ file_id, title, description, date, location }) {
    try {
      const response = await api.post('meetups', {
        file_id,
        title,
        description,
        date,
        location,
      });

      toast.success('Meetup cadastrado com sucesso!');
      history.push(`meetup/${response.data.id}`);
    } catch (err) {
      toast.error('Houve algum erro no cadastro, tente novamente');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <BannerInput name="file_id" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Input multiline placeholder="Descrição completa" name="description" />
        <DatePicker name="date" placeholder="Data do Meetup" />
        <Input type="text" name="location" placeholder="Localização" />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

export default CreateMeetup;
