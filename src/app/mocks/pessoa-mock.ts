import { http, HttpResponse } from 'msw';

export const PessoasMock = [
    http.get('https://example.com/pessoas', () => {
        return HttpResponse.json(
            [
               { 
                    "id": 1,
                    "cpf": "877.440.360-50",
                    "nome": "João Silva",
                    "escola": {
                        "id": 1,
                        "nome": "Escola A"
                    },
                    "cadastroFinalizado": true
                },
                {
                    "id": 2,
                    "cpf": "350.612.070-09",
                    "nome": "Maria Oliveira",
                    "escola": {
                        "id": 1,
                        "nome": "Escola A"
                    },
                    "cadastroFinalizado": true
                },
                {
                    "id": 3,
                    "cpf": "063.594.830-33",
                    "nome": "Pedro Santos",
                    "escola": {
                        "id": 2,
                        "nome": "Escola B"
                    },
                    "cadastroFinalizado": true
                },
                {
                    "id": 4,
                    "cpf": "705.057.170-93",
                    "nome": "Ana Costa",
                    "escola": {
                        "id": 2,
                        "nome": "Escola B"
                    },
                    "cadastroFinalizado": true
                },
                {
                    "id": 5,
                    "cpf": "654.498.540-64",
                    "nome": "Carlos Pereira",
                    "escola": {
                        "id": 3,
                        "nome": "Escola C"
                    },
                    "cadastroFinalizado": true
                },
                { 
                     "id": 6,
                     "cpf": "630.697.400-81",
                     "nome": "Beatriz Almeida",
                     "escola": {
                         "id": 3,
                         "nome": "Escola C"
                     },
                     "cadastroFinalizado": true
                 },
                 {
                     "id": 7,
                     "cpf": "060.140.770-90",
                     "nome": "Luiz Souza",
                     "escola": {
                         "id": 4,
                         "nome": "Escola D"
                     },
                     "cadastroFinalizado": true
                 },
                 {
                     "id": 8,
                     "cpf": "996.054.350-12",
                     "nome": "Fernanda Rodrigues",
                     "escola": {
                         "id": 4,
                         "nome": "Escola D"
                     },
                     "cadastroFinalizado": true
                 },
                 {
                     "id": 9,
                     "cpf": "735.028.260-56",
                     "nome": "Rafael Lima",
                     "escola": {
                         "id": 5,
                         "nome": "Escola E"
                     },
                     "cadastroFinalizado": true
                 },
                 {
                     "id": 10,
                     "cpf": "759.128.990-04",
                     "nome": "Camila Rocha",
                     "escola": {
                         "id": 5,
                         "nome": "Escola E"
                     },
                     "cadastroFinalizado": true
                 }
            ],
            { status: 200 }
        );
    }),
];