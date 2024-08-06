import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

export default function () {
  const res = http.get('https://lab6.soonr.com/');
  sleep(1);
}

export function handleSummary(data) {
  const customTitle = 'Load Test on Lab6';
  const reportTitle = `${customTitle} - ${new Date().toLocaleDateString()}`;

  return {
      'Lab6_Report.html': htmlReport(data, { title: reportTitle }),
  };
}