import { FC } from "react";
import OnboardPageContent from "./components/OnboardPageContent";
import { Session, getServerSession } from "next-auth";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession();
  return <OnboardPageContent session={session as Session} />;
};

export default page;
