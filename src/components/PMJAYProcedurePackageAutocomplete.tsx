import {
  FormFieldBaseProps,
  useFormFieldPropsResolver,
} from "@/components/Form/FormFields/Utils";

import { Autocomplete } from "@/components/Form/FormFields/Autocomplete";
import FormField from "@/components/Form/FormFields/FormField";
import { mergeQueryOptions } from "@/Utils/utils";
import routes from "../api";
import useQuery from "@/Utils/request/useQuery";
import { useState } from "react";

export type PMJAYPackageItem = {
  name?: string;
  code?: string;
  price?: number;
  package_name?: string;
};

type Props = FormFieldBaseProps<PMJAYPackageItem>;

export default function PMJAYProcedurePackageAutocomplete(props: Props) {
  const field = useFormFieldPropsResolver(props);

  const [query, setQuery] = useState("");

  const { data, loading } = useQuery(routes.hcx.claims.listPMJYPackages, {
    query: { query, limit: 10 },
  });

  return (
    <FormField field={field}>
      <Autocomplete
        required
        id={field.id}
        disabled={field.disabled}
        value={field.value}
        onChange={field.handleChange}
        options={mergeQueryOptions(
          (field.value ? [field.value] : []).map((o) => ({
            ...o,
            price:
              o.price && parseFloat(o.price?.toString().replaceAll(",", "")),
          })),
          data ?? [],
          (obj) => obj.code,
        )}
        optionLabel={optionLabel}
        optionDescription={optionDescription}
        optionValue={(option) => option}
        onQuery={setQuery}
        isLoading={loading}
      />
    </FormField>
  );
}

const optionLabel = (option: PMJAYPackageItem) => {
  if (option.name) return option.name;
  if (option.package_name) return `${option.package_name} (Package)`;
  return "Unknown";
};

const optionDescription = (option: PMJAYPackageItem) => {
  const code = option.code || "Unknown";
  const packageName = option.package_name || "Unknown";
  return `Package: ${packageName} (${code})`;
};
