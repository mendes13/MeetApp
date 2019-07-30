import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { addDays, subDays, isBefore, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        return;
      }

      setLoading(true);
      const response = await api.get('meetups', {
        params: { date, page },
      });

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          dateFormatted: formatCardDate(meetup.date),
          banner_url: meetup.file.url.replace('localhost', '10.0.3.2'),
          past: isBefore(parseISO(meetup.date), new Date()),
        };
      });

      setMeetups([...meetups, ...data]);
      setLoading(false);
    }

    loadMeetups();
    // eslint-disable-next-line
  }, [date, page, isFocused]);

  // Infinite scroll functionality
  async function loadMore() {
    // To prevent unecessary loading - If meetups.length / 10 !== 0, it means that there isn't anything more to fetch - because the pagination limit is 10!
    if (meetups.length / 10 === 0) {
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
            onEndReachedThreshold={0.1}
            onEndReached={loadMore}
          />
        </Container>
      )}
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
