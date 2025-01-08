import 'server-only';
import { cache } from 'react';

import { cookies } from 'next/headers';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('x-token')?.value;

  return fetch(`${process.env.SESSION_HOST}/api/session`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
    .then((response) => response.json())
    .then(({ data, error }) => {
      if (error) {
        return null;
      }

      return { ...data, token: cookie };
    });
});
