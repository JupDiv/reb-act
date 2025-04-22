export async function POST(req) {
  const data = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.text(); // або .json() якщо підтримує
  return new Response(result, { status: 200 });
}
