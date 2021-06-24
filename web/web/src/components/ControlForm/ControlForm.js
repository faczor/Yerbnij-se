import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ErrorMessage } from '@hookform/error-message';

import ErrorAlert from './ErrorAlert';

const SingleWrapper = styled.div`
  margin: 20px 0;
`;

const ControlForm = ({
                       as,
                       control,
                       name,
                       label,
                       rules,
                       type,
                       errors,
                       defaultValue,
                       ...rest
                     }) => {
  return (
    <SingleWrapper>
      <Controller
        key={name}
        as={as}
        control={control}
        name={name}
        label={label}
        error={errors?.[name]}
        rules={rules}
        type={type}
        defaultValue={defaultValue}
        {...rest}
        render={props => {
          if (type === 'checkbox') {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    {...props}
                    checked={props.value}
                    onChange={e => props.onChange(e.target.checked)}
                    name='checkedA'
                  />
                }
                label={label}
              />
            );
          }
        }}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorAlert error={message} maxWidth='200px' type='simple' />
        )}
      />
    </SingleWrapper>
  );
};

export default ControlForm;