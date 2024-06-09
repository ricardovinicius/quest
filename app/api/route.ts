export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const res = await request.json();

  console.log(res.username);

  return Response.json(res);
}
