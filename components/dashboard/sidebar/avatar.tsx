import { auth } from "@/auth";

type Props = {};

const Avatar = async (props: Props) => {
  const session = await auth();
  console.log("session in client", session);
  return (
    <div>
      <div>
        <span>{session?.name}</span>
      </div>
    </div>
  );
};

export default Avatar;
