import { triggerGoal } from "@core/Integrations/Plausible";
import useAuthUser from "@core/common/hooks/useAuthUser";

import { ManagePatientOptionsComponentType } from "@/pluginTypes";
import { Link } from "raviger";
import CareIcon from "@/CAREUI/icons/CareIcon";
import { useTranslation } from "react-i18next";

const ManagePatientOptions: ManagePatientOptionsComponentType = ({
  patient,
  consultation,
}) => {
  const { t } = useTranslation();
  const authUser = useAuthUser();

  if (!consultation) {
    return null;
  }

  return (
    <div>
      <Link
        className="dropdown-item-primary pointer-events-auto m-2 flex cursor-pointer items-center justify-start gap-2 rounded border-0 p-2 text-sm font-normal transition-all duration-200 ease-in-out"
        href={`/facility/${patient.facility}/patient/${patient.id}/consultation/${consultation.id}/claims`}
        onClick={() => {
          triggerGoal("Patient Card Button Clicked", {
            buttonName: t("claims"),
            consultationId: consultation?.id,
            userId: authUser?.id,
          });
        }}
      >
        <CareIcon
          icon="l-copy-landscape"
          className="text-lg text-primary-500"
        />
        <span>{t("claims")}</span>
      </Link>
    </div>
  );
};

export default ManagePatientOptions;
