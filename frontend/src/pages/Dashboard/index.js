import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '../../services/api';
import formatDate from '../../util/formatDate';

import Loading from '../../components/Loading';

import { Container, MeetupList, Meetup } from './styles';

function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizer');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          url: `meetup/${meetup.id}`,
          formattedDate: formatDate(meetup.date),
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="create-meetup">
          <MdAddCircleOutline size={20} color="#fff" />
          Novo meetup
        </Link>
      </header>

      <MeetupList>
        {meetups.map(meetup => (
          <Meetup to={meetup.url} key={meetup.id}>
            <strong>{meetup.title}</strong>
            <span>
              {meetup.formattedDate}
              <MdChevronRight size={25} color="#fff" />
            </span>
          </Meetup>
        ))}
      </MeetupList>
    </Container>
  );
}

export default Dashboard;
