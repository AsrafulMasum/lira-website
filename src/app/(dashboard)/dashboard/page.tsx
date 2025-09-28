import ContestManagementPage from "@/components/dashboard/contestManagement/ContestManagementPage";
import ContainerLayout from "@/layout/ContainerLayout";

const DashboardMain = () => {
  return (
    <div className="my-10">
      <ContainerLayout>
        <ContestManagementPage />
      </ContainerLayout>
    </div>
  );
};

export default DashboardMain;
