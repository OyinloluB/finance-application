import { NextResponse } from "next/server";

/**
 * generic response handler for API routes
 * @param status - HTTP status code
 * @param data - response data (can be an object or array)
 * @returns NextResponse
 */
export function handleResponse<T>(status: number, data: T): NextResponse {
  return NextResponse.json(data, { status });
}
