import React, { createRef } from 'react';

import Input from '../Input/Input';
import Select from '../Select/Select';
import inputs from '../../constants/inputs.constant';

import css from './Form.module.css';
import { IFormCard } from '../FormCard/FormCard';

type IFormProps = {
  getCard: (card: IFormCard) => void;
};

class Form extends React.Component<IFormProps> {
  private readonly formRef: React.RefObject<HTMLFormElement>;

  constructor(props: never) {
    super(props);
    this.formRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = this.formRef?.current;
    console.log(formData?.userName.value);
    console.log(formData?.bDay.value);
    console.log(formData?.agreement.checked);
    console.log(formData?.rate.value);
    console.log(formData?.prefer.value);
    console.log(formData?.upload.value);
    console.log(formData?.technologies.value);

    const card: IFormCard = {
      id: crypto.randomUUID(),
      userName: formData?.userName.value,
      bDay: formData?.bDay.value,
      agreement: formData?.agreement.checked,
      rate: formData?.rate.value,
      prefer: formData?.prefer.value,
      technologies: formData?.technologies.value,
      upload: URL.createObjectURL(formData?.upload.files[0]),
    };

    this.props.getCard(card);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.FormWrapper} ref={this.formRef}>
        <Select />
        {inputs.map((el) => (
          <Input
            id={el.id}
            key={el.id}
            name={el.name}
            type={el.type}
            className={css.Input}
            value={el.value}
            label={el.label}
          />
        ))}
      </form>
    );
  }
}

export default Form;
