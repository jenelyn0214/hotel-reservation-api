import { IEmailJSConfig } from '@src/interfaces';

import { AxiosClient } from './axios-client';

export const sendEmail = async (
  config: IEmailJSConfig,
  templateID: string,
  params: Record<any, any>,
): Promise<boolean> => {
  const emailJSAxiosClient = new AxiosClient(config.apiUrl).init();

  const result = await emailJSAxiosClient.post('email/send', {
    service_id: config.serviceId,
    template_id: templateID,
    user_id: config.publicKey,
    template_params: params,
    accessToken: config.privateKey,
  });

  console.log('sent', result);

  return false;
};
