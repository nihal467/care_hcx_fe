import { useState } from "react";
import { useTranslation } from "react-i18next";

import CareIcon from "@/CAREUI/icons/CareIcon";

import { Submit } from "@/components/Common/ButtonV2";
import DialogModal from "@/components/Common/Dialog";
import { FileUpload } from "@/components/Files/FileUpload";

import * as Notification from "@/Utils/Notifications";
import request from "@/Utils/request/request";

import routes from "../api";
import { HCXClaimModel } from "../types";

interface Props {
  claim: HCXClaimModel;
  show: boolean;
  onClose: () => void;
}

export default function ClaimCreatedModal({ claim, ...props }: Props) {
  const { t } = useTranslation();

  const [isMakingClaim, setIsMakingClaim] = useState(false);

  const { use } = claim;

  const handleSubmit = async () => {
    setIsMakingClaim(true);

    const { res } = await request(routes.hcx.claims.makeClaim, {
      body: { claim: claim.id },
    });

    if (res?.ok) {
      Notification.Success({ msg: `${use} requested` });
      props.onClose();
    }

    setIsMakingClaim(false);
  };
  return (
    <DialogModal
      show={props.show}
      onClose={props.onClose}
      title={t("add_attachments")}
      description={`${t("claim__use__claim")}: #${claim.id?.slice(0, 5)}`}
      className="w-full max-w-screen-lg"
      titleAction={
        <Submit disabled={isMakingClaim} onClick={handleSubmit}>
          {isMakingClaim && (
            <CareIcon icon="l-spinner" className="animate-spin" />
          )}
          {isMakingClaim
            ? t("claim__requesting_claim")
            : t("claim__request_claim")}
        </Submit>
      }
    >
      <div className="p-4 pt-8">
        <FileUpload type="CLAIM" claimId={claim.id} />
      </div>
    </DialogModal>
  );
}
