import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Config from 'react-native-config';
import api from '../../services/api';
import formatCardDate from '../../util/formatCardDate';

import Background from '../../components/Background';
import Header from '../../components/Header';
import Card from '../../components/SubscriptionCard';

import { Container, SubscriptionList } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      const data = response.data.map(subscription => {
        return {
          ...subscription.meetup,
          id: subscription.id,
          dateFormatted: formatCardDate(subscription.meetup.date),
          file: {
            ...subscription.meetup.file,
            url: subscription.meetup.file.url.replace(
              'localhost',
              Config.API_HOST
            ),
          },
        };
      });

      setSubscriptions(data);
    }

    loadSubscriptions();
  }, [isFocused]);

  async function handleUnsubscription(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      const subscriptionsCopy = [...subscriptions.filter(sub => sub.id !== id)];

      setSubscriptions(subscriptionsCopy);
      Alert.alert('Sucesso', 'Inscrição cancelada com sucesso!');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Houve algum erro durante o cancelamento da inscrição, tente novamente'
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SubscriptionList
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          renderItem={({ item }) => (
            <Card subscription={item} onUnsubscription={handleUnsubscription} />
          )}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
