import React, { FC } from 'react';

interface Props {
  name: string,
  value: string
}

const InputComp: FC<Props> = props => {
  const { value } = props;
  return (
    <>
    <input type="text" value={value} />
    </>
  );
};

export default InputComp;