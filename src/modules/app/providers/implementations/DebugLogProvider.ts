/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from 'debug';

import IDebugLogProvider from '../IDebugLogProvider';
import messages from '../../intl/messages/en-US';

interface LogDTO {
  params?: any;
  message: string;
}

export default class DebugLogProvider implements IDebugLogProvider {
  essentialsLog({ params, message }: LogDTO): void {
    const logMessage = debug(messages.keys.logs.ESSENTIALS);
    logMessage(message, params);
  }

  errorLog({ params, message }: LogDTO): void {
    const logMessage = debug(messages.keys.logs.ERROR);
    logMessage(message, params);
  }
}
