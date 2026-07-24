# Page Pulse

## Overview

Page Pulse is a web application that audits any website URL and generates a report containing:

- HTTP Status
- Response Time
- Page Title
- Meta Description
- H1 Count
- Images Missing Alt Text
- Approximate Word Count

## Tech Stack

- React
- Node.js
- Express
- Axios
- Cheerio
- Jest

---

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

### Endpoint

POST `/audit`

### Request

```json
{
  "url": "https://example.com"
}
```

### Success Response

```json
{
  "httpStatus": 200,
  "responseTimeMs": 165,
  "pageTitle": "Example Domain",
  "metaDescription": "",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "approximateWordCount": 17
}
```

### Error Responses

- Invalid URL
- Request Timeout
- Non-HTML URL
- Missing URL

---

## Design Decisions

### 1. Express

Used Express because it is lightweight and simple for building REST APIs.

### 2. Cheerio

Used Cheerio instead of Puppeteer because only static HTML parsing is required, making it much faster.

### 3. Error Handling

Added URL validation, timeout handling, and non-HTML checks to prevent crashes and return meaningful error messages.

---

## Testing

Implemented three Jest tests:

- Valid URL
- Invalid URL
- Non-HTML response

Run tests using:

```bash
npm test
```

---

## AI Usage

I used AI to understand HTML parsing, API structure, and testing. After generating an initial solution, I reviewed the code, adjusted the implementation, improved error handling, and verified the final output myself.