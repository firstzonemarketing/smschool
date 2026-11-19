const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '';
const TOKEN_KEY = 'sm_school_admin_token';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function apiRequest<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    formData?: FormData;
    auth?: boolean;
  } = {}
): Promise<T> {
  const { method = 'GET', body, formData, auth = false } = options;
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (auth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let fetchBody: BodyInit | undefined;
  if (formData) {
    fetchBody = formData;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    fetchBody = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: fetchBody,
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const json = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401 && auth) {
      setAuthToken(null);
    }
    if (!isJson && (res.status === 404 || res.status === 405)) {
      throw new ApiError(
        'Laravel API server is not reachable from static GitHub Pages. Connect a hosted Laravel backend via VITE_API_BASE_URL or deploy the included Dockerfile on Render/Railway.',
        res.status
      );
    }
    const firstFieldError =
      json?.errors && typeof json.errors === 'object'
        ? (Object.values(json.errors).flat()[0] as string | undefined)
        : undefined;
    const message = firstFieldError || json?.message || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, json?.errors);
  }

  if (!isJson) {
    throw new ApiError(
      'Laravel API server is not connected on static hosting. Deploy the Laravel backend and set VITE_API_BASE_URL.',
      502
    );
  }

  return json as T;
}
