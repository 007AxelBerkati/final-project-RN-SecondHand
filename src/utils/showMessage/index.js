import { showMessage } from 'react-native-flash-message';
import { colors } from '../colors';

export function showError(message) {
  showMessage({
    message,
    type: 'danger',
    color: colors.white,
    icon: 'danger',

  });
}

export function showSuccess(message) {
  showMessage({
    message,
    type: 'success',
    color: colors.white,
    icon: 'success',
  });
}

export function showInfo(message) {
  showMessage({
    message,
    type: 'info',
    color: colors.white,
    icon: 'info',
  });
}
