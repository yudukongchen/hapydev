import SvgEmphasize from '@assets/icons/emphasize.svg?react';
import SvgOkay from '@assets/icons/okay.svg?react';
import SvgSent from '../icons/sent.svg?react';
import SvgReceived from '../icons/received.svg?react';

export const MESSAGE_ICONS = {
  disconnect: SvgEmphasize,
  connected: SvgOkay,
  error: SvgEmphasize,
  sent: SvgSent,
  received: SvgReceived,
};
