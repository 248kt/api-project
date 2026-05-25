export type Language = "javascript" | "python" | "go" | "ruby" | "curl" | "php";

export const LANGUAGES: { id: Language; label: string }[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "python",     label: "Python"     },
  { id: "go",         label: "Go"         },
  { id: "ruby",       label: "Ruby"       },
  { id: "curl",       label: "cURL"       },
  { id: "php",        label: "PHP"        },
];

export interface CodeGenOptions {
  method?: string;
  url: string;
  authType: "none" | "apiKey" | "bearer" | "oauth2";
  authHeader?: string;
  authQuery?: string;
  body?: Record<string, unknown>;
  extraHeaders?: Record<string, string>;
}

function buildHeaders(
  authType: string,
  authHeader: string,
  extra: Record<string, string>
): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json", ...extra };
  if (authType === "bearer" || authType === "oauth2") {
    headers["Authorization"] = "Bearer YOUR_ACCESS_TOKEN";
  } else if (authType === "apiKey" && authHeader) {
    headers[authHeader] = "YOUR_API_KEY";
  }
  return headers;
}

function buildUrl(url: string, authQuery?: string): string {
  if (!authQuery) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${authQuery}=YOUR_API_KEY`;
}

export function generateCodeExamples(opts: CodeGenOptions): Record<Language, string> {
  const {
    method = "GET",
    url: rawUrl,
    authType,
    authHeader = "X-API-Key",
    authQuery,
    body,
    extraHeaders = {},
  } = opts;

  const url = buildUrl(rawUrl, authQuery);
  const headers = buildHeaders(authType, authHeader, extraHeaders);
  const hasBody = body && method !== "GET";

  const headerEntries = Object.entries(headers);
  const bodyStr = hasBody ? JSON.stringify(body, null, 2) : null;

  return {
    javascript: genJS(method, url, headerEntries, bodyStr),
    python: genPython(method, url, headerEntries, bodyStr),
    go: genGo(method, url, headerEntries, bodyStr),
    ruby: genRuby(method, url, headerEntries, bodyStr),
    curl: genCurl(method, url, headerEntries, bodyStr),
    php: genPHP(method, url, headerEntries, bodyStr),
  };
}

function genJS(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hObj = headers.map(([k, v]) => `  "${k}": "${v}"`).join(",\n");
  const bodyPart = body ? `,\n  body: JSON.stringify(${body})` : "";
  return `const response = await fetch("${url}", {
  method: "${method}",
  headers: {
${hObj}
  }${bodyPart}
});

const data = await response.json();
console.log(data);`;
}

function genPython(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hLines = headers.map(([k, v]) => `    "${k}": "${v}"`).join(",\n");
  const bodyPart = body ? `,\n    json=${body}` : "";
  return `import requests

response = requests.${method.toLowerCase()}(
    "${url}",
    headers={
${hLines}
    }${bodyPart}
)

print(response.json())`;
}

function genGo(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hLines = headers.map(([k, v]) => `\treq.Header.Set("${k}", "${v}")`).join("\n");
  const bodyImport = body ? `\t"bytes"\n\t"encoding/json"\n\t` : "\t";
  const bodySetup = body
    ? `\tpayload, _ := json.Marshal(${body})\n\tbody := bytes.NewBuffer(payload)\n\t`
    : `\tbody := http.NoBody\n\t`;
  return `package main

import (
${bodyImport}"fmt"
\t"io"
\t"net/http"
)

func main() {
${bodySetup}req, _ := http.NewRequest("${method}", "${url}", body)
${hLines}

\tclient := &http.Client{}
\tresp, _ := client.Do(req)
\tdefer resp.Body.Close()

\tresult, _ := io.ReadAll(resp.Body)
\tfmt.Println(string(result))
}`;
}

function genRuby(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hLines = headers.map(([k, v]) => `  "${k}" => "${v}"`).join(",\n");
  const bodyPart = body ? `,\n  body: ${body}.to_json` : "";
  return `require "net/http"
require "json"

uri = URI("${url}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == "https"

request = Net::HTTP::${method[0] + method.slice(1).toLowerCase()}.new(uri.request_uri, {
${hLines}
}${bodyPart})

response = http.request(request)
puts JSON.parse(response.body)`;
}

function genCurl(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hLines = headers.map(([k, v]) => `  -H "${k}: ${v}"`).join(" \\\n");
  const bodyPart = body ? ` \\\n  -d '${JSON.stringify(body)}'` : "";
  return `curl -X ${method} "${url}" \\
${hLines}${bodyPart}`;
}

function genPHP(method: string, url: string, headers: [string, string][], body: string | null): string {
  const hLines = headers.map(([k, v]) => `    "${k}: ${v}"`).join(",\n");
  const bodyPart = body ? `\ncurl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${body}));` : "";
  return `<?php
$ch = curl_init("${url}");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${method}");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
${hLines}
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);${bodyPart}

$response = curl_exec($ch);
curl_close($ch);

echo json_decode($response, true);`;
}
