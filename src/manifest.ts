import { lazy } from "react";
import routes from "./routes";
import { PluginManifest } from "@/pluginTypes";

const manifest: PluginManifest = {
  plugin: "care_hcx",
  routes,
  extends: [],
  components: {
    ManagePatientOptions: lazy(
      () => import("./components/ManagePatientOptions"),
    ),
    // TODO: care_hcx_fe - add claim in discharge patient
  },
  navItems: [],
};

export default manifest;
