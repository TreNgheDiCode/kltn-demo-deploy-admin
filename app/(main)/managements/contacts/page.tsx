import { ContactsTable } from "@/components/contacts/contacts-table";
import { GetContactLib } from "@/lib/contact";
import { Card, CardHeader } from "@nextui-org/react";

const ManangementContactsPage = async () => {
  const contacts = await GetContactLib();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="hidden lg:flex flex-col gap-2">
            <h1 className="font-semibold text-lg text-primary">
              Quản lý phản hồi
            </h1>
          </div>
        </CardHeader>
      </Card>
      <ContactsTable contacts={contacts} />
    </div>
  );
};

export default ManangementContactsPage;
