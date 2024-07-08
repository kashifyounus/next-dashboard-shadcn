import { auth } from "@/auth";

type Props = {};

const Avatar = async (props: Props) => {
  const session = await auth();
  console.log("session in client", session?.user?.name);
  return (
    <div>
      <div>
        <span>{session?.user?.name}</span>
      </div>
    </div>
  );
};

export default Avatar;
