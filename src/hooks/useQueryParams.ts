import { useState, useEffect, useCallback } from 'react';

function useQueryParams() {
  const getParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: { [key: string]: string } = {};

    // Iterate over all entries and construct the params object
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;

  }, [window.location.search]);


  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>(getParams());

  useEffect(() => {
    // TODO: double check if needed
    setQueryParams(getParams);
  }, [window.location.search]);

  return queryParams;
}

export default useQueryParams;
