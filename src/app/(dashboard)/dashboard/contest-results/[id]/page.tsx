import ContestResultPage from "@/components/dashboard/contestManagement/ContestResultPage";

interface PageProps {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: PageProps) => {
  const paramsData = await params;
  return (
    <div>
      <ContestResultPage params={paramsData} />
    </div>
  );
};

export default page;
