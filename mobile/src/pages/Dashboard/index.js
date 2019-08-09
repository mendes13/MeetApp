import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { addDays, subDays, isBefore, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Config from 'react-native-config';
import api from '../../services/api';
import formatCardDate from '../../util/formatCardDate';
import formatMainDate from '../../util/formatMainDate';

import Card from '../../components/DashboardCard';
import Background from '../../components/Background';
import Header from '../../components/Header';

import {
  Container,
  Loading,
  DatePicker,
  DatePickerText,
  MeetupList,
} from './styles';

function Dashboard({ isFocused }) {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainDateFormatted = useMemo(() => {
    return formatMainDate(date);
  }, [date]);

  useEffect(() => {
    async function loadMeetups() {
      if (!isFocused) {
        setMeetups([]);
        setPage(1);
        return;
      }

      if (page === 1) {
        setLoading(true);
      }

      try {
        const response = await api.get('meetups', {
          params: { date, page },
        });

        const data = response.data.map(meetup => {
          return {
            ...meetup,
            dateFormatted: formatCardDate(meetup.date),
            file: {
              ...meetup.file,
              url: meetup.file.url.replace('localhost', Config.API_HOST),
            },
            past: isBefore(parseISO(meetup.date), new Date()),
          };
        });

        setMeetups([...meetups, ...data]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadMeetups();
    // eslint-disable-next-line
  }, [date, page, isFocused]);

  // Infinite scroll functionality
  async function handleEndReached() {
    // To prevent unecessary loading - If meetups.length % 10 !== 0, it means that there isn't anything more to fetch - because the pagination limit is 10!
    if (meetups.length % 10 === 0) {
      setPage(page + 1);
    }
  }

  function handlePrevDay() {
    setPage(1);
    setMeetups([]);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setPage(1);
    setMeetups([]);
    setDate(addDays(date, 1));
  }

  async function handleSubscription(id) {
    try {
      await api.post('/subscriptions', {
        meetup_id: id,
      });
      Alert.alert('Sucesso', 'Inscrição realizada com sucesso!');

      setMeetups([
        ...meetups.map(meetup =>
          meetup.id === id ? { ...meetup, subscribed: true } : { ...meetup }
        ),
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Houve algum erro na inscrição, tente novamente');
    }
  }

  return (
    <Background>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <DatePicker>
            <TouchableOpacity onPress={handlePrevDay}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </TouchableOpacity>
            <DatePickerText>{mainDateFormatted}</DatePickerText>
            <TouchableOpacity onPress={handleNextDay}>
              <Icon name="chevron-right" size={30} color="#fff" />
            </TouchableOpacity>
          </DatePicker>

          <MeetupList
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            renderItem={({ item }) => (
              <Card meetup={item} onSubscription={handleSubscription} />
            )}
            onEndReachedThreshold={0.2}
            onEndReached={handleEndReached}
          />
        </Container>
      )}
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
