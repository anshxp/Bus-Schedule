// Central API base for the frontend. Uses Vite env var when available.
// This file sanitizes common malformed values (e.g. ":3000") so the
// app doesn't attempt requests to an invalid origin like ":3000"
const raw = import.meta.env.VITE_API_URL;

function normalizeBase(rawValue) {
	if (!rawValue) return 'http://localhost:3000';
	const v = rawValue.trim();
	// If the value is like ":3000" (missing host/protocol), make it explicit
	if (/^:\d+$/.test(v)) {
		const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:';
		const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
		console.warn(`VITE_API_URL looks like a port-only value (${v}). Interpreting as ${proto}//${host}${v}`);
		return `${proto}//${host}${v}`;
	}
	// If it starts with '//' (protocol-relative), prefix current protocol
	if (v.startsWith('//')) {
		const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:';
		return `${proto}${v}`;
	}
	// If it lacks protocol but has host (e.g. example.com or example.com:3000), prefix https by default
	if (!/^https?:\/\//i.test(v)) {
		console.warn(`VITE_API_URL (${v}) missing protocol; prefixing with 'https://'`);
		return `https://${v}`;
	}
	return v;
}

export const API = normalizeBase(raw);

// Helpful debug log during development — remove if you prefer silence
if (typeof window !== 'undefined') {
	// eslint-disable-next-line no-console
	console.info('[API] using backend base:', API);
}
