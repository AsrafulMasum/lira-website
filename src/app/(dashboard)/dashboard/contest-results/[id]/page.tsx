import ContestResultPage from "@/components/dashboard/contestManagement/ContestResultPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  return (
    <div>
      <ContestResultPage contestId={id} />
    </div>
  );
};

export default page;
