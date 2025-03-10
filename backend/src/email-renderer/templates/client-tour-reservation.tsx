import { Text } from '@react-email/components';
import * as React from 'react';
import Layout, {
  LayoutProps,
  previewProps as layoutPreviewProps,
} from 'src/email-renderer/templates/layout';

interface ClientTourReservationProps {
  hello: string;
  text: string;
  layoutProps: LayoutProps;
}

export const ClientTourReservation = async ({
  hello,
  text,
  layoutProps,
}: ClientTourReservationProps) => {
  return (
    <Layout {...layoutProps}>
      <Text>{hello}! 👋</Text>
      <Text>{text}</Text>
    </Layout>
  );
};

const previewProps: ClientTourReservationProps = {
  hello: 'Здравствуйте',
  text: 'Вы бронировали тур 12.01.2025 15:00 - 14.01.2025 16:00',
  layoutProps: {
    ...layoutPreviewProps,
    title: 'Бронирование тура',
  },
};

ClientTourReservation.PreviewProps = previewProps;

export default ClientTourReservation;
