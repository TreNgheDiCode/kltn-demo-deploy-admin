import { AccountsTable } from "@/components/accounts/accounts-table";
import { HeadingAccount } from "@/components/accounts/heading-account";
import { GetAccountLib } from "@/lib/account";

const AccountsPage = async () => {
  const accounts = await GetAccountLib();

  if (!accounts || !accounts.every((account) => account.student)) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div className="space-y-4">
      <HeadingAccount />
      <AccountsTable accounts={accounts} />
    </div>
  );
};

export default AccountsPage;
