import * as Notification from "@/Utils/Notifications";

import { AdditionalDischargeProceduresComponentType } from "@/pluginTypes";
import ClaimCard from "./ClaimCard";
import CreateClaimCard from "./CreateClaimCard";
import { HCXClaimModel } from "../types";
import routes from "../api";
import { useMessageListener } from "@/common/hooks/useMessageListener";
import useQuery from "@/Utils/request/useQuery";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AdditionalDischargeProcedures: AdditionalDischargeProceduresComponentType =
  ({ consultation }) => {
    const { t } = useTranslation();
    const [latestClaim, setLatestClaim] = useState<HCXClaimModel>();
    const [isCreateClaimLoading, setIsCreateClaimLoading] = useState(false);

    const { refetch: refetchLatestClaim } = useQuery(routes.hcx.claims.list, {
      query: {
        consultation: consultation.id,
        ordering: "-modified_date",
        use: "claim",
        outcome: "complete",
        limit: 1,
      },
      onResponse: (res) => {
        if (!isCreateClaimLoading) return;

        setIsCreateClaimLoading(false);

        if (res?.data?.results?.length !== 0) {
          setLatestClaim(res?.data?.results[0]);
          Notification.Success({
            msg: t("claim__fetched_claim_approval_results"),
          });
          return;
        }

        setLatestClaim(undefined);
        Notification.Success({
          msg: t("claim__error_fetching_claim_approval_results"),
        });
      },
    });

    useMessageListener((data) => {
      if (
        data.type === "MESSAGE" &&
        (data.from === "claim/on_submit" ||
          data.from === "preauth/on_submit") &&
        data.message === "success"
      ) {
        refetchLatestClaim();
      }
    });

    return (
      <div className="my-5 rounded p-5 shadow">
        <h2 className="mb-2">{t("claim_insurance")}</h2>
        {latestClaim ? (
          <ClaimCard claim={latestClaim} />
        ) : (
          <CreateClaimCard
            consultationId={consultation.id ?? ""}
            patientId={consultation.patient ?? ""}
            use="claim"
            isCreating={isCreateClaimLoading}
            setIsCreating={setIsCreateClaimLoading}
          />
        )}
      </div>
    );
  };

export default AdditionalDischargeProcedures;
