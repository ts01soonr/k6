import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  duration: '1m',
  vus: 50,
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');
  sleep(1);
}

export function handleSummary(data) {
    const customTitle = 'API Load Test';
    const reportTitle = `${customTitle} - ${new Date().toLocaleDateString()}`;

    return {
        'apiTestSummaryReport.html': htmlReport(data, { title: reportTitle }),
    };
}