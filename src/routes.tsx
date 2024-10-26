import { AppRoutes } from "@core/Routers/AppRouter";
import ConsultationClaims from "./pages/ConsultationClaims";

const routes: AppRoutes = {
  "/facility/:facilityId/patient/:patientId/consultation/:consultationId/claims":
    ({ facilityId, patientId, consultationId }) => (
      <ConsultationClaims
        facilityId={facilityId}
        patientId={patientId}
        consultationId={consultationId}
      />
    ),
};

export default routes;
