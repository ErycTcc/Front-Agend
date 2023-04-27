import { DEFAULT } from 'src/libs/global/constants';

export const http = (path, { method, headers, body }) => (
    fetch(`${DEFAULT.ENDPOINT.API_URL}${path}`, { method, headers, body })
        .then(response => response.json())
        .then(body => body)
);