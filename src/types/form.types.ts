import { InputFields } from 'components/Form';
import { IFormCard } from 'components/FormCard/FormCard';

export type IForm = {
  getCard: (card: IFormCard) => void;
  setIsOpen: (value: boolean) => void;
};

export interface InputsType {
  [InputFields.UserName]: string;
  [InputFields.BirthDate]: string;
  [InputFields.Preferences]: string;
  [InputFields.Upload]: string;
  [InputFields.Agreement]: string;
  [InputFields.Rating]: string;
  [InputFields.Technology]: string;
}
