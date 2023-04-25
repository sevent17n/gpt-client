import { NextRequest, NextResponse } from "next/server";

import { getServerSideConfig } from "../../config/server";

const serverConfig = getServerSideConfig();

const DANGER_CONFIG = {
  needCode: serverConfig.needCode,
};

declare global {
  type DangerConfig = typeof DANGER_CONFIG;
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    needCode: serverConfig.needCode,
  });
}
