import { Text } from '@react-email/components';
import * as React from 'react';
import Layout, {
  LayoutProps,
  previewProps as layoutPreviewProps,
} from 'src/email-renderer/templates/layout';

interface SupplierTourReservationProps {
  hello: string;
  text: string;
  clientInfo: {
    intro: string;
    name: string;
    email: string;
    phone: string;
  };
  layoutProps: LayoutProps;
}

export const SupplierTourReservation = async ({
  hello,
  text,
  clientInfo,
  layoutProps,
}: SupplierTourReservationProps) => {
  return (
    <Layout {...layoutProps}>
      <Text>{hello}! 👋</Text>
      <Text>{text}</Text>
      <Text>{clientInfo.intro}</Text>
      <Text>
        {clientInfo.name}
        <br />
        {clientInfo.email}
        <br />
        {clientInfo.phone}
      </Text>
    </Layout>
  );
};

const previewProps: SupplierTourReservationProps = {
  hello: 'Здравствуйте',
  text: 'У вас бронировали тур 12.01.2025 15:00 - 14.01.2025 16:00',
  clientInfo: {
    intro: 'Информация о клиенте:',
    phone: '+77001112233',
    name: 'Пример Примерович',
    email: 'example@example.com',
  },
  layoutProps: {
    ...layoutPreviewProps,
    title: 'Бронирование тура',
  },
};

SupplierTourReservation.PreviewProps = previewProps;

export default SupplierTourReservation;
