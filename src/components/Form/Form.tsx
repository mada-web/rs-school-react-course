import React, { createRef } from 'react';

import Input from '../Input/Input';
import Select from '../Select/Select';
import { IFormCard } from '../FormCard/FormCard';

import css from './Form.module.css';

type IFormProps = {
  getCard: (card: IFormCard) => void;
  setIsOpen: (value: boolean) => void;
};

type IFormState = {
  errors: {
    [key: string]: string;
  };
};

class Form extends React.Component<IFormProps, IFormState> {
  formRef: React.RefObject<HTMLFormElement> = createRef();
  nameRef: React.RefObject<HTMLInputElement> = createRef();
  dateRef: React.RefObject<HTMLInputElement> = createRef();
  selectRef: React.RefObject<HTMLSelectElement> = createRef();
  checkboxRef: React.RefObject<HTMLInputElement> = createRef();
  firstRadioRef: React.RefObject<HTMLInputElement> = createRef();
  secondRadioRef: React.RefObject<HTMLInputElement> = createRef();
  ratingRef: React.RefObject<HTMLInputElement> = createRef();
  fileRef: React.RefObject<HTMLInputElement> = createRef();

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateFormData = (data: IFormCard) => {
    if (!data.userName) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, userName: 'Name is required' },
      }));
    } else if (/[a-z]/.test(data.userName.charAt(0))) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, userName: 'Name is invalid.' },
      }));
    } else if (this.state.errors.userName) {
      const state = this.state.errors;
      delete state.userName;
      this.setState({
        errors: { ...state },
      });
    }

    if (!data.birthDate) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, birthDate: 'Date of birth is required.' },
      }));
    } else if (this.state.errors.birthDate) {
      const state = this.state.errors;
      delete state.birthDate;
      this.setState({
        errors: { ...state },
      });
    }

    if (!data.preferences) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, preferences: 'Choose the value.' },
      }));
    } else if (this.state.errors.preferences) {
      const state = this.state.errors;
      delete state.preferences;
      this.setState({
        errors: { ...state },
      });
    }

    if (data.technology === 'Choose') {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, technology: 'Choose the value.' },
      }));
    } else if (this.state.errors.technology) {
      const state = this.state.errors;
      delete state.technology;
      this.setState({
        errors: { ...state },
      });
    }

    if (!data.agreement) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, agreement: 'You should accept the agreement.' },
      }));
    } else if (this.state.errors.agreement) {
      const state = this.state.errors;
      delete state.agreement;
      this.setState({
        errors: { ...state },
      });
    }

    if (!data.fileURL) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, upload: 'Please, upload some image.' },
      }));
    } else if (this.state.errors.upload) {
      const state = this.state.errors;
      delete state.upload;
      this.setState({
        errors: { ...state },
      });
    }

    if (!data.rating || data.rating == 0) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, rating: 'Please, rate this form!' },
      }));
    } else if (this.state.errors.rating) {
      const state = this.state.errors;
      delete state.rating;
      this.setState({
        errors: { ...state },
      });
    }
  };

  async handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstRadio = this.firstRadioRef.current?.checked ? 'Functions' : '';
    const secondRadio = this.secondRadioRef.current?.checked ? 'Classes' : '';

    const userName = this.nameRef.current?.value || '';
    const birthDate = this.dateRef.current?.value || '';
    const preferences = firstRadio || secondRadio;
    const rating = this.ratingRef.current?.value || '';
    const technology = this.selectRef.current?.value || '';
    const agreement = this.checkboxRef.current?.checked ? 'Accepted' : '';
    const fileURL = this.fileRef.current?.files?.length
      ? URL.createObjectURL(this.fileRef.current.files[0])
      : '';

    const card: IFormCard = {
      id: crypto.randomUUID(),
      userName,
      birthDate,
      preferences,
      rating,
      technology,
      agreement,
      fileURL,
    };

    await this.validateFormData(card);

    if (Object.keys(this.state.errors).length === 0) {
      this.props.getCard(card);
      this.formRef?.current?.reset();
      this.props.setIsOpen(true);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.FormWrapper} ref={this.formRef}>
        <fieldset className={css.Fieldset}>
          <legend>Tell me about yourself, please</legend>
          <Input
            id={'userName'}
            name={'userName'}
            type={'text'}
            label={'Enter your name: '}
            className={css.Input}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.nameRef}
            errors={this.state.errors}
          />
          <Input
            id={'birthDate'}
            name={'birthDate'}
            type={'date'}
            label={'Enter you date of birth: '}
            className={css.Input}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.dateRef}
            errors={this.state.errors}
          />
        </fieldset>

        <fieldset className={css.Fieldset}>
          <legend>What do you prefer?</legend>
          <Select refProp={this.selectRef} errors={this.state.errors} />
          <Input
            id={'Functions'}
            name={'preferences'}
            type={'radio'}
            label={'Functions'}
            className={css.RadioInput}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.firstRadioRef}
            errors={this.state.errors}
          />
          <Input
            id={'Classes'}
            name={'preferences'}
            type={'radio'}
            label={'Classes'}
            className={css.RadioInput}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.secondRadioRef}
            errors={this.state.errors}
          />
        </fieldset>
        <fieldset className={css.Fieldset}>
          <legend>Some additional things</legend>
          <Input
            id={'upload'}
            name={'upload'}
            type={'file'}
            accept={'image/*'}
            label={'Upload your image: '}
            className={css.Input}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.fileRef}
            errors={this.state.errors}
          />
          <Input
            id={'rating'}
            name={'rating'}
            type={'range'}
            label={'Rate this form, please: '}
            className={css.Input}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.ratingRef}
            errors={this.state.errors}
            defaultValue={0}
          />
          <Input
            id={'agreement'}
            name={'agreement'}
            type={'checkbox'}
            label={'I consent to my personal data'}
            className={css.Check}
            labelClassName={css.Label}
            wrapperClassName={css.InputWrapper}
            refProp={this.checkboxRef}
            errors={this.state.errors}
          />
        </fieldset>

        <Input id={'submit'} name={'submit'} type={'submit'} className={css.Submit} />
      </form>
    );
  }
}

export default Form;
