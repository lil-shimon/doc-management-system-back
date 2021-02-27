import React, { useState } from 'react';
import SignIn from '../components/organisms/SignInForm';
import Head from 'next/head';
import { AuthMode } from '../components/Authenication';

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>見積もり管理システム</title>
      </Head>
      <SignIn />
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    authMode: AuthMode.PUBLIC,
  },
});
