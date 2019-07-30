import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriberMail {
  get key() {
    return 'SubscriberMail';
  }

  async handle({ data }) {
    const { meetup, subscriber } = data;

    const meetupFormattedDate = format(
      parseISO(meetup.date),
      "dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: 'Nova inscrição no seu Meetup!',
      template: 'subscribed',
      context: {
        organizer: meetup.organizer.name,
        subscriberName: subscriber.name,
        subscriberEmail: subscriber.email,
        meetupTitle: meetup.title,
        meetupDescription: meetup.description,
        meetupDate: meetupFormattedDate,
        meetupLocation: meetup.location,
      },
    });
  }
}

export default new SubscriberMail();
