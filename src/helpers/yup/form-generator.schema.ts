import * as yup from "yup";

export const formGeneratorSchema = yup.object().shape({
  label: yup.string().required('Field is required!'),
  type: yup.string().required('Field is required!'),
  isRequired: yup.string().required('Field is required!'),
  maxLength: yup.string().required('Field is required!').matches(/^\d+$/, "Limit should only contain numbers"),
  minLength: yup.string().required('Field is required!').matches(/^\d+$/, "Limit should only contain numbers"),
  options: yup.array().of(
    yup.object().shape({
      label: yup.string().required('Option label is required!'),
      value: yup.string().required('Option value is required!')
    })
  ).optional()
})