import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import api_url from '../../enviroment';
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
          banner_url: subscription.meetup.file.url.replace(
            'localhost',
            api_url
          ),
        };
      });
      console.tron.log(data.banner_url);
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

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
