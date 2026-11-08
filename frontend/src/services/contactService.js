import { request } from './api';

/**
 * Submit contact inquiry / feedback to FastAPI backend.
 */
export async function sendContactInquiry(formData) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

