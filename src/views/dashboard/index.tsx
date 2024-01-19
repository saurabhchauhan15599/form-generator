/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalDialog, Radio } from "@mui/joy";
import {
  CheckboxLabel,
  SelectLabel,
  TextAreaLabel,
  TextField,
  TrashCanIcon,
} from "@saurabh-chauhan/sc-components-library";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { v4 } from "uuid";
import AddFormComponents from "../../components/FormAdd";
import css from "./index.module.scss";

export interface IFormGenerator {
  id?: string;
  label: string;
  type: string;
  isRequired: string;
  maxLength: string;
  minLength: string;
  options?: { label: string; value: string }[];
}

interface IFormState {
  formdata: IFormGenerator[];
  finalFormData?: any;
  open: boolean;
}

const Dashboard: React.FC = () => {
  const [formState, setFormState] = useState<IFormState>({
    open: false,
    finalFormData: [],
    formdata: [],
  });

  const { open, formdata, finalFormData } = formState;

  const formGenerator = useForm<IFormGenerator>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      label: "",
      type: "",
      isRequired: "",
      maxLength: "",
      minLength: "",
      options: [{ label: "", value: "" }],
    },
  });

  const { handleSubmit: formGenerationSubmit, reset } = formGenerator;

  const { handleSubmit: DynamicFieldSubmission, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormGenerator> = (data) => {
    const value = { ...data, id: v4() };
    setFormState((prev) => ({
      ...prev,
      open: !prev.open,
      formdata: [...prev.formdata, value],
    }));
    reset();
  };

  const handleSubmit = (data: any) => {
    setFormState((prev) => ({ ...prev, finalFormData: data }));
  };

  const handleClick = (idx: string) => {
    const targetIndex = formdata.findIndex((val) => val.id === idx);
    formdata.splice(targetIndex, 1);
    setFormState((prev) => ({ ...prev, formdata: formdata }));
  };

  return (
    <main className={css.container}>
      <Modal
        open={open}
        disableAutoFocus
        onClose={() => setFormState((prev) => ({ ...prev, open: !prev.open }))}
      >
        <ModalDialog
          color="primary"
          layout="center"
          size="lg"
          variant="outlined"
        >
          <div className={css.formWrapper}>
            <form noValidate onSubmit={formGenerationSubmit(onSubmit)}>
              <FormProvider {...formGenerator}>
                <AddFormComponents />
              </FormProvider>
              <section className={css.btnContainer}>
                <Button
                  variant="soft"
                  type="submit"
                  color="success"
                  className={css.button}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  color="warning"
                  className={css.button}
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, open: !prev.open }))
                  }
                >
                  Cancel
                </Button>
              </section>
            </form>
          </div>
        </ModalDialog>
      </Modal>

      <Button
        onClick={() => setFormState((prev) => ({ ...prev, open: !prev.open }))}
      >
        Add Field
      </Button>
      <section className={css.formFields}>
        <form noValidate onSubmit={DynamicFieldSubmission(handleSubmit)}>
          {formdata?.map((formField) => {
            return (
              <div key={formField.id} className={css.field}>
                <Controller
                  name={`${formField.label}-${formField.id}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    switch (formField.type) {
                      case "Input":
                        return (
                          <TextField
                            {...field}
                            type="text"
                            required={
                              formField.isRequired === "Yes" ? true : false
                            }
                            label={formField.label}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        );
                      case "Dropdown":
                        return (
                          <SelectLabel
                            {...field}
                            getOptionLabel={(option: any) => option.label}
                            getOptionValue={(option: any) => option.value}
                            label={formField.label}
                            options={formField.options}
                            required={
                              formField.isRequired === "Yes" ? true : false
                            }
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        );

                      case "Checkbox":
                        return (
                          <CheckboxLabel
                            {...field}
                            type="checkbox"
                            label={formField.label}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        );
                      case "Radio":
                        return (
                          <Radio
                            label={formField.label}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        );

                      case "Text Area":
                        return (
                          <TextAreaLabel
                            {...field}
                            rows={3}
                            label={formField.label}
                            required={
                              formField.isRequired === "Yes" ? true : false
                            }
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        );
                      default:
                        return <></>;
                    }
                  }}
                />
                <TrashCanIcon
                  onClick={() => handleClick(formField.id as string)}
                />
              </div>
            );
          })}
          {formdata.length > 0 && (
            <section className={css.btnContainer}>
              <Button
                variant="soft"
                type="submit"
                color="success"
                className={css.button}
              >
                Submit
              </Button>
            </section>
          )}
        </form>
      </section>
      {Array.isArray(finalFormData) ? "" : JSON.stringify(finalFormData)}
    </main>
  );
};

export default Dashboard;
