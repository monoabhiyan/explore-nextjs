import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin?callbackUrl=/dashboard');
  }
  return (
    <div>
      Dashboard page
    </div>
  );
};

export default DashboardPage;
