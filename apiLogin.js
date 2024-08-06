import { check } from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
        browser: {
            executor: 'constant-vus',
            exec: 'browser',
            vus: 10,
            duration: '20s',
        },

    },
};

export function browser() {
    const response = http.post(
        'https://ecommerce-playground.lambdatest.io/index.php?route=account/login',
        {
            'input-email': 'lambdatest.Cypress@disposable.com',
            'input-password': 'Cypress123!!',
        }
    );

    check(response, {
        'user is logged in': (res) =>
            res.status === 200 && res.body.includes('My Account'),
    });
}
