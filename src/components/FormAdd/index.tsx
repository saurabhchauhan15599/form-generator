import { Button, Input } from "@mui/joy";
import {
  AlertErrorIcon,
  SelectLabel,
  TextField,
  TrashCanIcon,
} from "@saurabh-chauhan/sc-components-library";
import React from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FIELD_REQUIRED, FIELD_TYPE_OPTIONS } from "../../helpers/constants";
import css from "./index.module.scss";

const AddFormComponents: React.FC = () => {
  const { control, setValue } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: "options",
    control,
  });

  const watchFields = useWatch({
    name: ["type"],
    control,
  });

  const handleAddOptions = () => {
    append({
      label: "",
      value: "",
    });
  };

  const IsDropdown = watchFields[0] === "Dropdown";
  const IsInput = watchFields[0] === "Input";
  const IsTextArea = watchFields[0] === "Text Area";

  return (
    <div className={css.container}>
      <Controller
        name="label"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            label="Field Name"
            placeholder="Enter field name.."
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            endIcon={fieldState.invalid && <AlertErrorIcon />}
          />
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <SelectLabel
            {...field}
            required
            options={FIELD_TYPE_OPTIONS}
            value={
              field.value
                ? {
                    value: field.value,
                    label: field.value,
                  }
                : ""
            }
            label="Field Type"
            placeholder="Select field type.."
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={(option: any) => setValue("type", option.value)}
          />
        )}
      />
      <section className={css.dropdown}>
        {IsDropdown && (
          <Button
            type="button"
            variant="outlined"
            color="success"
            onClick={handleAddOptions}
          >
            Add Options
          </Button>
        )}
        {IsDropdown &&
          fields.map((field, index) => {
            return (
              <div key={field.id} className={css.options}>
                <Controller
                  name={`options.${index}.label`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input {...field} required placeholder="Enter label.." />
                  )}
                />
                <Controller
                  name={`options.${index}.value`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input {...field} required placeholder="Enter value.." />
                  )}
                />
                <TrashCanIcon onClick={() => remove(index)} />
              </div>
            );
          })}
      </section>
      <Controller
        name="isRequired"
        control={control}
        render={({ field, fieldState }) => (
          <SelectLabel
            {...field}
            required
            options={FIELD_REQUIRED}
            value={
              field.value
                ? {
                    value: field.value,
                    label: field.value,
                  }
                : ""
            }
            label="Field Required"
            placeholder="Is field required?"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            onChange={(option: any) => {
              setValue("isRequired", option.value);
            }}
          />
        )}
      />
      {IsInput || IsTextArea && (
        <>
          <Controller
            name="maxLength"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                label="Max Length"
                placeholder="Enter max number of character in field.."
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                endIcon={fieldState.invalid && <AlertErrorIcon />}
              />
            )}
          />
          <Controller
            name="minLength"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                label="Min Length"
                placeholder="Enter min number of character in field.."
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                endIcon={fieldState.invalid && <AlertErrorIcon />}
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default AddFormComponents;
