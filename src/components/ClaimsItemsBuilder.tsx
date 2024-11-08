import { useTranslation } from "react-i18next";

import CareIcon from "@/CAREUI/icons/CareIcon";

import ButtonV2 from "@/components/Common/ButtonV2";
import AutocompleteFormField from "@/components/Form/FormFields/Autocomplete";
import FormField, { FieldLabel } from "@/components/Form/FormFields/FormField";
import TextFormField from "@/components/Form/FormFields/TextFormField";
import {
  FieldChangeEvent,
  FormFieldBaseProps,
  useFormFieldPropsResolver,
} from "@/components/Form/FormFields/Utils";

import { ITEM_CATEGORIES } from "../constants";
import { HCXItemModel } from "../types";
import PMJAYProcedurePackageAutocomplete from "./PMJAYProcedurePackageAutocomplete";

type Props = FormFieldBaseProps<HCXItemModel[]>;

export default function ClaimsItemsBuilder(props: Props) {
  const { t } = useTranslation();

  const field = useFormFieldPropsResolver(props);

  const handleUpdate = (index: number) => {
    return (event: FieldChangeEvent<any>) => {
      if (event.name === "hbp") {
        field.handleChange(
          (props.value || [])?.map((obj, i) =>
            i === index
              ? {
                  ...obj,
                  id: event.value.code,
                  name: event.value.name,
                  price: event.value.price,
                }
              : obj,
          ),
        );
      } else {
        field.handleChange(
          (props.value || [])?.map((obj, i) =>
            i === index ? { ...obj, [event.name]: event.value } : obj,
          ),
        );
      }
    };
  };

  const handleRemove = (index: number) => {
    return () => {
      field.handleChange((props.value || [])?.filter((obj, i) => i !== index));
    };
  };

  return (
    <FormField field={field}>
      <div className="flex flex-col gap-3">
        {props.value?.map((obj, index) => {
          return (
            <div
              key={index}
              className="rounded-lg border-2 border-dashed border-secondary-200 p-4"
            >
              <div className="flex items-center justify-between">
                <FieldLabel className="my-auto !font-bold">
                  {t("claim__item")} {index + 1}
                </FieldLabel>
                {!props.disabled && (
                  <ButtonV2
                    variant="danger"
                    type="button"
                    ghost
                    onClick={handleRemove(index)}
                    disabled={props.disabled}
                  >
                    {t("remove")}
                    <CareIcon icon="l-trash-alt" className="text-lg" />
                  </ButtonV2>
                )}
              </div>

              <div className="p-2">
                <AutocompleteFormField
                  className="w-full"
                  required
                  name="category"
                  label={t("claim__item__category")}
                  options={ITEM_CATEGORIES}
                  optionLabel={(o) => o.display}
                  optionValue={(o) => o.code}
                  value={obj.category}
                  onChange={handleUpdate(index)}
                  disabled={props.disabled}
                  errorClassName="hidden"
                />

                <div className="mt-2 grid grid-cols-4 gap-2 max-sm:grid-cols-1">
                  {obj.category === "HBP" && !obj.id ? (
                    <>
                      <PMJAYProcedurePackageAutocomplete
                        required
                        className="col-span-full"
                        labelClassName="text-sm text-secondary-700"
                        label={t("claim__item__procedure")}
                        name="hbp"
                        value={obj}
                        onChange={handleUpdate(index)}
                        errorClassName="hidden"
                      />
                    </>
                  ) : (
                    <>
                      <TextFormField
                        className="col-span-1"
                        required
                        name="id"
                        label={t("claim__item__id")}
                        placeholder={t("claim__item__id__example")}
                        onChange={handleUpdate(index)}
                        value={obj.id}
                        disabled={props.disabled}
                        errorClassName="hidden"
                      />
                      <TextFormField
                        className="col-span-2"
                        required
                        name="name"
                        label={t("claim__item__name")}
                        placeholder={t("claim__item__name__example")}
                        value={obj.name}
                        onChange={handleUpdate(index)}
                        disabled={props.disabled}
                        errorClassName="hidden"
                      />
                      <TextFormField
                        className="col-span-1"
                        required
                        type="number"
                        name="price"
                        min={0}
                        label={t("claim__item__price")}
                        placeholder={t("claim__item__price__example")}
                        value={obj.price?.toString()}
                        onChange={(event) =>
                          handleUpdate(index)({
                            name: event.name,
                            value: parseFloat(event.value),
                          })
                        }
                        disabled={props.disabled}
                        errorClassName="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FormField>
  );
}
