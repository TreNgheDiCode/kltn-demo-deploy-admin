interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ProfileIdPage = ({ params }: ProfileIdPageProps) => {
  return <div>{params.profileId}</div>;
};

export default ProfileIdPage;
