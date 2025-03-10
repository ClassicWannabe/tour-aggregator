import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Section,
  Row,
  Column,
  Text,
} from '@react-email/components';
import * as React from 'react';

export interface LayoutProps {
  staticBaseUrl: string;
  preview?: string;
  title?: string;
  warning: string;
  support: {
    title: string;
    text: string;
    email: string;
  };
}

export const Layout = async ({
  staticBaseUrl,
  preview,
  title,
  warning,
  support,
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <Html>
      <Head />
      {preview && <Preview>{preview}</Preview>}
      <Tailwind>
        <Body className="bg-[rgba(0,0,0,0.1)] my-auto mx-auto font-sans p-10">
          <Container className="bg-white rounded-lg my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Section>
              <Row>
                <Column className="w-14">
                  <Img src={`${staticBaseUrl}/logo.png`} alt="movo logo" />
                </Column>
                <Column>
                  <Heading className="text-[#00BE8B]">movo</Heading>
                </Column>
              </Row>
            </Section>
            {title && (
              <Heading as="h2" className="text-[#00BE8B] text-xl">
                {title}
              </Heading>
            )}

            {children}

            <Text>{warning}</Text>
            <Text className="m-0 text-gray-500">{support.title}</Text>
            <Text className="m-0 text-gray-500">
              {support.text}{' '}
              <Link href={`mailto:${support.email}`}>{support.email}</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const previewProps: LayoutProps = {
  staticBaseUrl: '/static',
  title: 'Опциональный заголовок',
  warning:
    'Если вы не регистрировались на нашей платформе, просто проигнорируйте это письмо.',
  support: {
    title: 'Если у вас возникли вопросы или проблемы, свяжитесь с нами:',
    text: 'Напишите нам на email:',
    email: 'support@movo.com',
  },
};

Layout.PreviewProps = previewProps;

export default Layout;
