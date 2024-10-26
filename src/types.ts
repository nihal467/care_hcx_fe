import { ConsultationModel } from "@/components/Facility/models";
import { HCXPolicyModel } from "@/components/HCX/models";
import { UserBareMinimum } from "@/components/Users/models";

export interface HCXCommunicationModel {
  id?: string;
  identifier?: string;
  claim?: string;
  claim_object?: HCXClaimModel;
  content?: { type: string; data: string }[];
  created_by?: string | null;
  last_modified_by?: string | null;
  created_date?: string;
  modified_date?: string;
}

export interface HCXItemModel {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export type HCXClaimPriority = "Immediate" | "Normal" | "Deferred";
export type HCXClaimUse = "Claim" | "Pre Authorization" | "Pre Determination";
export type HCXClaimStatus =
  | "Active"
  | "Cancelled"
  | "Draft"
  | "Entered In Error";
export type HCXClaimType =
  | "Institutional"
  | "Oral"
  | "Pharmacy"
  | "Professional"
  | "Vision";
export type HCXClaimOutcome =
  | "Queued"
  | "Complete"
  | "Error"
  | "Partial Processing";

export interface HCXClaimModel {
  id?: string;
  consultation: string;
  consultation_object?: ConsultationModel;
  policy: string;
  policy_object?: HCXPolicyModel;
  items?: HCXItemModel[];
  total_claim_amount?: number;
  total_amount_approved?: number;
  use?: HCXClaimUse;
  status?: HCXClaimStatus;
  priority?: HCXClaimPriority;
  type?: HCXClaimType;
  outcome?: HCXClaimOutcome;
  error_text?: string;
  created_by?: UserBareMinimum;
  last_modified_by?: UserBareMinimum;
  created_date?: string;
  modified_date?: string;
}
