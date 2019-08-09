import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import Loading from '../../components/Loading';

import { Container, Actions, Content, Information } from './styles';

import formatDate from '../../util/formatDate';

function Meetup({ match }) {
  const [meetup, setMeetup] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${id}`);

      const data = {
        ...response.data.meetup,
        banner_url: response.data.meetup.file.url,
        formattedDate: formatDate(response.data.meetup.date),
      };

      setMeetup(data);
      setLoading(false);
    }
    loadMeetup();
  }, [id]);

  async function handleMeetupDelete() {
    await api.delete(`meetups/${id}`);
    toast.success('Meetup removido com sucesso!');
    history.push('/dashboard');
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <Actions>
          <Link
            to={{
              pathname: `/edit-meetup/${meetup.id}`,
              state: {
                ...meetup,
              },
            }}
          >
            <MdEdit size={20} color="#fff" />
            Editar
          </Link>
          <button type="button" onClick={handleMeetupDelete}>
            <MdDeleteForever size={20} color="#fff" />
            Cancelar
          </button>
        </Actions>
      </header>

      <Content>
        <img src={meetup.banner_url} alt={meetup.title} />
        <p>{meetup.description}</p>
        <Information>
          <time>
            <MdEvent size={20} color="#999" />
            {meetup.formattedDate}
          </time>
          <strong>
            <MdPlace size={20} color="#999" />
            {meetup.location}
          </strong>
        </Information>
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Meetup;
