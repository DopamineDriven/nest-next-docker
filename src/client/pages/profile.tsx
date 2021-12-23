import React from 'react';
import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { Request } from 'express';
import { User } from '../app/types/graphql-zeus';

type UnwrapServerSideProps<T extends keyof GetServerSidePropsContext> = {
  [P in T]: GetServerSidePropsContext[P];
};

type ProfileProps = {
  user: User | undefined;
};

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProfileProps>> {
  return {
    props: { user: (req as Request)?.user as User },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Profile = <T extends typeof getServerSideProps>(
  props: InferGetServerSidePropsType<T>,
) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
