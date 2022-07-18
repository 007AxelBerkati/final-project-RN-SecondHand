import React from 'react';
import { render } from '@testing-library/react-native';
import { ButtonComponent } from '../../../src/components';

describe('ButtonComponent', () => {
  const title = 'Test Button';
  const mockOnPress = jest.fn();

  it('should render ButtonComponent', () => {
    const { getByTestId } = render(
      <ButtonComponent
        title={title}
        onPress={mockOnPress}
        testID="test-button"
      />,
    );
    expect(getByTestId('test-button')).toBeTruthy();
  });

  it('should become disabled button', () => {
    const { getByText } = render(<ButtonComponent title={title} disable />);

    const button = getByText(title);
    expect(button).toBeDisabled();
  });

  it('should render button with icon', () => {
    const { getByText } = render(<ButtonComponent title={title} icon="arrow-right" />);

    const button = getByText(title);
    expect(button).toBeTruthy();
  });
});
