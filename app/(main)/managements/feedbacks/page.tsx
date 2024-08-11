import { FeedbacksTable } from "@/components/feedbacks/feedbacks-table";
import { GetFeedbackLib } from "@/lib/feedback";
import { Card, CardHeader } from "@nextui-org/react";

const ManangementFeedbacksPage = async () => {
  const feedbacks = await GetFeedbackLib();

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
      <FeedbacksTable feedbacks={feedbacks} />
    </div>
  );
};

export default ManangementFeedbacksPage;
