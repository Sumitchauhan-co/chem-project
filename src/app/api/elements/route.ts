// src/app/api/elements/route.ts

import fs from 'fs';

export async function GET() {
    const res = await fetch(
        'https://periodic-table-api.p.rapidapi.com/getAllElements',
        {
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY!,
                'x-rapidapi-host': 'periodic-table-api.p.rapidapi.com',
            },
        },
    );
    const data = await res.json();

    fs.writeFileSync('src/lib/elements.json', JSON.stringify(data, null, 2));

    console.log(`data saved successfully`, data);

    return Response.json(data);
}
