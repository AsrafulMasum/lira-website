import ContainerLayout from "@/layout/ContainerLayout";
import NewContestPage from "@/components/dashboard/contestCreation/NewContestPage";

const NewContest = () => {
  return (
    <div className="bg-bg">
      <ContainerLayout>
        <NewContestPage />
      </ContainerLayout>
    </div>
  );
};

export default NewContest;
