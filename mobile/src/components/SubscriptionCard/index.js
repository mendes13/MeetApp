import React from 'react';

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

export default function Card({ subscription, onUnsubscription }) {
  return (
    <Container>
      <Banner source={{ uri: subscription.banner_url }} />
      <Wrapper>
        <Title>{subscription.title}</Title>
        <Information>
          <CustomIcon name="event" />
          <InformationText>{subscription.dateFormatted}</InformationText>
        </Information>
        <Information>
          <CustomIcon name="place" />
          <InformationText>{subscription.location}</InformationText>
        </Information>
        <Information>
          <CustomIcon name="person" />
          <InformationText>
            Organizador: {subscription.organizer.name}
          </InformationText>
        </Information>

        <SubscriptionButton onPress={() => onUnsubscription(subscription.id)}>
          Cancelar Inscrição
        </SubscriptionButton>
      </Wrapper>
    </Container>
  );
}
