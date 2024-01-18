import { Radio } from "@mui/joy";
import {
  CheckboxLabel,
  SelectLabel,
  TextAreaLabel,
  TextField,
} from "@saurabh-chauhan/sc-components-library";
import { IFormGenerator } from ".";

export const generateFormElement = (data: IFormGenerator) => {
  
  const generateInput = (data: IFormGenerator) => {
    return (
      <TextField
        label={data.label}
        required={data.isRequired === "Yes" ? true : false}
        minLength={parseInt(data.minLength)}
        maxLength={parseInt(data.maxLength)}
        type={data.type}
      />
    );
  };

  const generateTextArea = (data: IFormGenerator) => {
    return (
      <TextAreaLabel
        label={data.label}
        required={data.isRequired === "Yes" ? true : false}
        minLength={parseInt(data.minLength)}
        maxLength={parseInt(data.maxLength)}
      />
    );
  };

  const generateDropdown = (data: IFormGenerator) => {
    return (
      <SelectLabel
        label={data.label}
        required={data.isRequired === "Yes" ? true : false}
        options={data.options}
      />
    );
  };

  const generateCheckbox = (data: IFormGenerator) => {
    return (
      <CheckboxLabel
        label={data.label}
        required={data.isRequired === "Yes" ? true : false}
      />
    );
  };

  const generateRadio = (data: IFormGenerator) => {
    return <Radio color="primary" variant="soft" label={data.label} />;
  };

  const selectedField = (data: IFormGenerator) => {
    switch (data.type) {
      case "Input":
        return generateInput(data);

      case "Text Area":
        return generateTextArea(data);

      case "Dropdown":
        return generateDropdown(data);

      case "Checkbox":
        return generateCheckbox(data);

      case "Radio":
        return generateRadio(data);

      default:
        break;
    }
  };

  return selectedField(data);
};
