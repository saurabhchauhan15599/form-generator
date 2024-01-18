import { Button, Modal, ModalDialog } from "@mui/joy";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import AddFormComponents from "../../components/FormAdd";
import css from "./index.module.scss";

interface IFormGenerator {
  label: string;
  type: string;
  isRequired: boolean;
  maxLength: string;
  minLength: string;
  options?: { label: string; value: string }[];
}

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const formGenerator = useForm<IFormGenerator>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      label: "",
      type: "",
      isRequired: false,
      maxLength: "",
      minLength: "",
      options: [{ label: "", value: "" }],
    },
  });

  const { handleSubmit, reset } = formGenerator;

  const onSubmit: SubmitHandler<IFormGenerator> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={css.container}>
      <Modal open={open} disableAutoFocus onClose={() => setOpen(!open)}>
        <ModalDialog
          color="primary"
          layout="center"
          size="lg"
          variant="outlined"
        >
          <div className={css.formWrapper}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </Button>
              </section>
            </form>
          </div>
        </ModalDialog>
      </Modal>

      <Button onClick={() => setOpen(!open)}>Add Field</Button>
    </div>
  );
};

export default Dashboard;
