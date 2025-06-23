import {NextRequest, NextResponse} from "next/server";
import {runCampaignCheck} from "@/lib/utils/draw";

export async function GET(req: NextRequest) {
  if(req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  
  await runCampaignCheck();
  return NextResponse.json({message: "Cron job executed successfully"}, {status: 200});
}