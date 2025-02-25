import { http, HttpResponse } from 'msw';

export const EscolasMock = [
    http.get('https://example.com/escolas', () => {
        return HttpResponse.json(
            [
               { 
                    "id": 1,
                    "cnpj": "14.166.648/0001-47",
                    "nome": "Escola A"
                },
                {
                    "id": 2,
                    "cnpj": "35.783.453/0001-16",
                    "nome": "Escola B"
                },
                {
                    "id": 3,
                    "cnpj": "63.344.553/0001-81",
                    "nome": "Escola C"
                },
                {
                    "id": 4,
                    "cnpj": "68.008.877/0001-62",
                    "nome": "Escola D"
                },
                {
                    "id": 5,
                    "cnpj": "02.170.854/0001-41",
                    "nome": "Escola E"
                }
            ],
            { status: 200 }
        );
    }),
];