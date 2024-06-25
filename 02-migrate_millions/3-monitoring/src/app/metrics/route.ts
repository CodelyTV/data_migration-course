import { NextResponse } from "next/server";
import promClient from "prom-client";

export async function GET(_request: Request): Promise<NextResponse> {
	const metrics = await promClient.register.metrics();

	const response = new NextResponse(metrics, { status: 200 });
	response.headers.set("Content-Type", promClient.register.contentType);

	return response;
}
