interface ProfileIdPageProps {
  params: {
    accountId: string;
  };
}

const ProfileIdPage = ({ params }: ProfileIdPageProps) => {
  return <div>{params.accountId}</div>;
};

export default ProfileIdPage;
