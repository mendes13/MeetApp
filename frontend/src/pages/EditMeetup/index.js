import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import DatePicker from '../../components/DatePicker';
import BannerInput from '../../components/BannerInput';
import Loading from '../../components/Loading';

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

function EditMeetup({ match, location: { state } }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${id}`);

      const data = {
        ...response.data.meetup,
        avatar_url: response.data.meetup.file.url,
      };

      setMeetup(data);
      setLoading(false);
    }

    if (state) {
      setMeetup(state);
      setLoading(false);
    } else {
      loadMeetup();
    }
  }, [id, state]);

  async function handleSubmit({ file_id, title, description, date, location }) {
    try {
      const response = await api.put(`meetups/${id}`, {
        file_id,
        title,
        description,
        date,
        location,
      });

      toast.success('Meetup cadastrado com sucesso!');
      history.push(`/meetup/${response.data.id}`);
    } catch (err) {
      toast.error(
        'Houve algum erro. Verifique se você já tem algum Meetup marcado no horário!'
      );
    }
  }

  if (loading) return <Loading />;

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={meetup}>
        <BannerInput
          name="file_id"
          bannerId={meetup.file.id}
          bannerUrl={meetup.file.url}
        />
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

EditMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

EditMeetup.defaultProps = {
  location: {
    state: null,
  },
};

export default EditMeetup;
