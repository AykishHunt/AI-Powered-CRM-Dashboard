import DashboardLayout from "../../components/layout/DashboardLayout";
import Contacts from "../Contact";

export default function AdminContacts() {
  return (
    <DashboardLayout>
      <Contacts admin={true} />
    </DashboardLayout>
  );
}