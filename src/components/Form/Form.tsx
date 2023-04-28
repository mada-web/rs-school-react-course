import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IForm, IFormCard, InputsType } from 'types';
import { InputFields, inputsConfiguration } from './Form.config';

import css from './Form.module.css';

export const Form: FC<IForm> = ({ getCard, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    const card: IFormCard = {
      id: crypto.randomUUID(),
      userName: data[InputFields.UserName],
      birthDate: data[InputFields.BirthDate],
      preferences: data[InputFields.Preferences],
      technology: data[InputFields.Technology],
      fileURL: URL.createObjectURL(
        new Blob([data[InputFields.Upload][0]], { type: 'application/octet-stream' })
      ),
    };

    getCard(card);
    setIsOpen(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.FormWrapper} data-testid="form">
      {inputsConfiguration.map((el) => (
        <div key={el.id} className={css.InputWrapper}>
          <label htmlFor={el.id} className={css.Label}>
            {el.label}
          </label>
          <div className={css.InputContainer}>
            {el.type !== 'select' && (
              <input
                id={el.id}
                type={el.type}
                {...register(el.name, {
                  required: el.required,
                  minLength: el.minLength,
                  pattern: el.pattern,
                })}
                className={css[el.className]}
                aria-invalid={!!errors[el.name]}
                value={el.value}
                accept={el.accept}
              />
            )}

            {el.type === 'select' && el.options && (
              <select
                id={el.id}
                {...register(el.name, { required: el.required })}
                className={css[el.className]}
                aria-invalid={!!errors[el.name]}
                defaultValue=""
              >
                {el.options.map((el) => (
                  <option key={el.value} value={el.value} disabled={el.value == ''}>
                    {el.label}
                  </option>
                ))}
              </select>
            )}

            {errors[el.name] && <span className={css.Error}>{errors[el.name]?.message}</span>}
          </div>
        </div>
      ))}
      <input type="submit" name={'submit'} className={css.Submit} />
    </form>
  );
};
