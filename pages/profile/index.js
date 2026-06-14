import CompleteProfile from "@/components/profile/completeProfile";
import { getSession } from "next-auth/react";
// import { useEffect } from "react";

function Profile() {
  return (
    <div>
      <CompleteProfile />
    </div>
  );
}

export default Profile;

// for serverside gaurd
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // console.log(context);

  // console.log(session);

  if (!session) {
    return { redirect: { destination: "/authentication", permanent: false } };
  }
  // await console.log(context);
  return { props: { session } };
}
