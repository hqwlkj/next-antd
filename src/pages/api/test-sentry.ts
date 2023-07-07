import * as Sentry from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    throw new Error('API Test Sentry');
  } catch (error) {
    Sentry.captureException(error);
  }

  res.status(200).json({ name: 'Test Sentry' });
}
