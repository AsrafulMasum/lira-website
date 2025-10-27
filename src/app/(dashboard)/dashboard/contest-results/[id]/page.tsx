import ContestResultPage from "@/components/dashboard/contestManagement/ContestResultPage";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ContestResultPage contestId={params.id} />
    </div>
  );
};

export default page;
