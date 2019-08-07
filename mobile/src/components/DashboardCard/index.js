import React from 'react';
import PropTypes from 'prop-types';

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
      <Banner source={{ uri: meetup.file.url }} />
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

Card.propTypes = {
  meetup: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    dateFormatted: PropTypes.string,
    location: PropTypes.string,
    subscribed: PropTypes.bool,
    past: PropTypes.bool,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  onSubscription: PropTypes.func.isRequired,
};
