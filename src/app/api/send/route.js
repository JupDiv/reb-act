export async function POST(req) {
  const data = await req.json();

  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbyLIrQRwF9ug_YWsqSO3dyrWJxkFy8lHyhArNJrX8hpiNA-wtHROkN7bPHvIFJ-IOEUsA/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.text(); // або .json() якщо підтримує
  return new Response(result, { status: 200 });
}
