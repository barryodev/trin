import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "@/keystatic.config";

const keystaticRouteHandler = makeRouteHandler({
  config: keystaticConfig,
});

export const POST = keystaticRouteHandler.POST;

export async function GET(request: Request) {
  const response = await keystaticRouteHandler.GET(request);
  const location = response.headers.get("location");

  if (location?.startsWith("https://github.com/login/oauth/authorize")) {
    const authorizationUrl = new URL(location);
    authorizationUrl.searchParams.set("scope", "public_repo");

    const headers = new Headers(response.headers);
    headers.set("location", authorizationUrl.toString());

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}
