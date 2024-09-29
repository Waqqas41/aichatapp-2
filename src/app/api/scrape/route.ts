import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ data: [], error: true });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const scrapedData : any = [];

    $("p").each((index, element) => {
      scrapedData.push($(element).text());
    });

    console.log(scrapedData);

    return NextResponse.json({ data: scrapedData, error: false });
  } catch (error) {
    return NextResponse.json({ data: [], error: true });
  }
}
