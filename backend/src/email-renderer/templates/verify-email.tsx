import { Text, Button } from '@react-email/components';
import * as React from 'react';
import Layout, {
  LayoutProps,
  previewProps as layoutPreviewProps,
} from 'src/email-renderer/templates/layout';

interface VerifyEmailProps {
  verifyLink: string;
  hello: string;
  text: string;
  buttonText: string;
  layoutProps: LayoutProps;
}

export const VerifyEmail = async ({
  hello,
  verifyLink,
  text,
  buttonText,
  layoutProps,
}: VerifyEmailProps) => {
  return (
    <Layout {...layoutProps}>
      <Text>{hello}! 👋</Text>
      <Text>{text}</Text>
      <Button
        href={verifyLink}
        target="_blank"
        className="bg-[#00BE8B] text-white text-lg text-center align-middle inline-block leading-[3.5rem] rounded-lg w-56 h-14 font-semibold"
      >
        {buttonText}
      </Button>
    </Layout>
  );
};

const previewProps: VerifyEmailProps = {
  verifyLink: '123456',
  hello: 'Здравствуйте',
  text: 'Спасибо за регистрацию на нашей платформе! Чтобы завершить процесс, пожалуйста, подтвердите ваш email. Это займет всего один клик.',
  buttonText: 'Подтвердить E-mail',
  layoutProps: {
    ...layoutPreviewProps,
    title: 'Подтвердите ваш email для завершения регистрации',
  },
};

VerifyEmail.PreviewProps = previewProps;

export default VerifyEmail;
