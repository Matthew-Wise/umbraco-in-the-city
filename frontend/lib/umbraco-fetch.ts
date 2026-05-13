type NextRequestInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export const umbracoFetch = async <T>(
  url: string,
  options: NextRequestInit = {},
): Promise<T> => {
  const baseUrl = process.env.UMBRACO_BASE_URL;
  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Api-Version": "1",
      ...(process.env.UMBRACO_DELIVERY_API_KEY && {
        "Api-Key": process.env.UMBRACO_DELIVERY_API_KEY,
      }),
      ...options.headers,
    },
    next: options.next ?? { revalidate: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json() as Promise<T>;
};
