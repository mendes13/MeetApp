import React from 'react';
import { Alert } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Banner,
  Wrapper,
  Title,
  Information,
  InformationText,
  CustomIcon,
  SubscriptionButton,
} from './styles';

export default function Card({ meetup, onSubscription }) {
  return (
    <Container>
      <Banner source={{ uri: meetup.banner_url }} />
      <Wrapper>
        <Title>{meetup.title}</Title>
        <Information>
          <CustomIcon name="event" />
          <InformationText>{meetup.dateFormatted}</InformationText>
        </Information>
        <Information>
          <CustomIcon name="place" />
          <InformationText>{meetup.location}</InformationText>
        </Information>
        <Information>
          <CustomIcon name="person" />
          <InformationText>
            Organizador: {meetup.organizer.name}
          </InformationText>
        </Information>

        {!meetup.subscribed && !meetup.past && (
          <SubscriptionButton onPress={() => onSubscription(meetup.id)}>
            Realizar Inscrição
          </SubscriptionButton>
        )}
      </Wrapper>
    </Container>
  );
}
