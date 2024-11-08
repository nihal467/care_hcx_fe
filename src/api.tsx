import { Type } from "@/Utils/request/api";
import { PaginatedResponse } from "@/Utils/request/types";

import { PMJAYPackageItem } from "./components/PMJAYProcedurePackageAutocomplete";
import { HCXClaimModel, HCXCommunicationModel } from "./types";

// TODO: care_hcx_fe - add hcx api routes
const routes = {
  hcx: {
    claims: {
      list: {
        path: "/api/hcx/claim/",
        method: "GET",
        TRes: Type<PaginatedResponse<HCXClaimModel>>(),
      },

      create: {
        path: "/api/hcx/claim/",
        method: "POST",
        TBody: Type<{
          policy: string;
          items: {
            id: string;
            price: number;
            category?: string;
            name: string;
          }[];
          consultation: string;
          use: "preauthorization" | "claim";
        }>(),
        TRes: Type<HCXClaimModel>(),
      },

      get: {
        path: "/api/hcx/claim/{external_id}/",
        method: "GET",
      },

      update: {
        path: "/api/hcx/claim/{external_id}/",
        method: "PUT",
      },

      partialUpdate: {
        path: "/api/hcx/claim/{external_id}/",
        method: "PATCH",
      },

      delete: {
        path: "/api/hcx/claim/{external_id}/",
        method: "DELETE",
      },

      listPMJYPackages: {
        path: "/api/hcx/pmjy_packages/",
        method: "GET",
        TRes: Type<PMJAYPackageItem[]>(),
      },

      makeClaim: {
        path: "/api/hcx/make_claim/",
        method: "POST",
        TBody: Type<{ claim: string }>(),
        TRes: Type<unknown>(),
      },
    },

    communications: {
      list: {
        path: "/api/hcx/communication/",
        method: "GET",
        TRes: Type<PaginatedResponse<HCXCommunicationModel>>(),
      },

      create: {
        path: "/api/hcx/communication/",
        method: "POST",
        TRes: Type<HCXCommunicationModel>(),
        TBody: Type<{
          claim: string;
          content: {
            type: string;
            data: string;
          }[];
        }>(),
      },

      get: {
        path: "/api/hcx/communication/{external_id}/",
        method: "GET",
        TRes: Type<HCXCommunicationModel>(),
      },

      update: {
        path: "/api/hcx/communication/{external_id}/",
        method: "PUT",
        TRes: Type<HCXCommunicationModel>(),
      },

      partialUpdate: {
        path: "/api/hcx/communication/{external_id}/",
        method: "PATCH",
        TRes: Type<HCXCommunicationModel>(),
      },

      delete: {
        path: "/api/hcx/communication/{external_id}/",
        method: "DELETE",
      },

      send: {
        path: "/api/hcx/send_communication/",
        method: "POST",
        TRes: Type<void>(),
        TBody: Type<{
          communication: string;
        }>(),
      },
    },
  },
} as const;

export default routes;
