import { ControllerRenderProps } from 'react-hook-form';

function numPositive(
  e: React.ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<any>
) {
  const value = parseFloat(e.target.value);
  field.onChange(isNaN(value) ? 0 : value);
}

export { numPositive };
