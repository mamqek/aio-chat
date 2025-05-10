import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

// ─── METRIC DEFINITIONS ────────────────────────────────────────────────
// 1) Track total login calls
export let loginRequests = new Counter('login_requests');
// 2) Track login request latency
export let loginTrend    = new Trend('login_duration_ms');

// 3) Track total chat messages sent
export let chatMsgs      = new Counter('chat_messages');
// 4) Track chat send latency
export let chatTrend     = new Trend('chat_duration_ms');
// 5) Track chat errors (non-200 responses)
export let chatErrors    = new Counter('chat_errors');

// export let options = {
//     vus: 10,
//     duration: '1m',
//     noCookiesReset: true,
//     thresholds: {
//         login_requests:    ['count==5'],      
//         login_duration_ms: ['p(95)<200'],     
//         chat_messages:     ['count>10'],      
//         chat_duration_ms:  ['p(95)<200'],     
//         chat_errors:       ['count==0'],      
//     },
// };


const allScenarios = {
    spikeTest: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '30s', target: 50 },
            { duration: '1m', target: 100 },
            { duration: '1m',  target: 200 },
            { duration: '1m',  target: 100 },
            { duration: '30s', target: 0  },
        ],
        gracefulRampDown: '15s',
    },
    shared_load: {
        executor: 'shared-iterations',
        vus: 50,
        iterations: 500,
        maxDuration: '2m',
    },
    user_flow: {
        executor: 'per-vu-iterations',
        vus: 50,
        iterations: 20,          // each user sends 20 messages
        maxDuration: '5m',
        startTime: '2s',
    },
    steady_users: {
        executor: 'constant-vus',
        vus: 100,
        duration: '3m',
        startTime: '1s',
    },
    ramp_up_down: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '1m', target: 100 },
            { duration: '1m', target: 0 },
        ],
        gracefulRampDown: '30s',
        startTime: '5s',
    },
    constant_rate: {
        executor: 'constant-arrival-rate',
        rate: 20,               // 20 iterations per second
        timeUnit: '1s',
        duration: '3m',
        preAllocatedVUs: 50,
        maxVUs: 200,
        startTime: '10s',
    },
    ramping_rate: {
        executor: 'ramping-arrival-rate',
        startRate: 10,          // start at 10 iterations per second
        timeUnit: '1s',
        stages: [
            { target: 100, duration: '2m' },
            { target: 50, duration: '1m' },
        ],
        preAllocatedVUs: 50,
        maxVUs: 200,
        startTime: '15s',
    },
    dynamic_control: {
        executor: 'externally-controlled',
        startTime: '20s',
    },
    normal: {
        executor: 'constant-vus',
        vus:       200,
        duration: '10s',
    },
}

const SCENARIO = __ENV.SCENARIO || 'normal'
export const options = {
    noCookiesReset: true,
    scenarios: SCENARIO === 'all'
        ? allScenarios
        : { [SCENARIO]: allScenarios[SCENARIO] || allScenarios.normal },

    thresholds: {
        login_requests:    ['count==2'],    // one per VU   
        login_duration_ms: ['p(95)<200'],   // 95% of logins under 200 ms
        chat_messages:     ['count>0'],     // at least 10 chat sends total
        chat_duration_ms:  ['p(95)<500'],   // 95% of chat sends under 500 ms
        chat_errors:       ['count==0'],    // no chat errors
        http_req_duration: ['p(95)<500'],   // 95% of all requests under 500 ms
    },
}

export default function () {


    // ─── LOGIN ON FIRST ITERATION ─────────────────────────────────────
    if (__ITER === 0) {

        let randomSleep = Math.floor(Math.random() * 10) + 1;
        sleep(randomSleep);

        let t0       = Date.now();

        let loginRes = http.post(
            'http://localhost:5555/login',
            JSON.stringify({ user_id: `${__VU}` }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        // let jar = http.cookieJar();
        // let cookies = jar.cookiesForURL('http://localhost:5555');
        // console.log(`VU${__VU} cookies after login: ${JSON.stringify(cookies)}`);

        loginTrend.add(Date.now() - t0);
        loginRequests.add(1);
        check(loginRes, { 'login 200': (r) => r.status === 200 });
    }

    // ─── CHAT MESSAGE EVERY ITERATION ─────────────────────────────────
    let t1     = Date.now();

    // Generate a random receiver_id from 1 to 50
    const randomReceiverId = Math.floor(Math.random() * 50) + 1;

    let msgRes = http.post(
        'http://localhost:5555/sendMessage',
        JSON.stringify({
            text:        `Hi from VU${__VU} iter ${__ITER}`,
            receiver_id: randomReceiverId,
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    if (msgRes.status !== 200) {
        chatErrors.add(1);
    }

    chatTrend.add(Date.now() - t1);
    chatMsgs.add(1);

    const success = check(msgRes, { 'chat 200': (r) => r.status === 200 });

    if (!success) {
        // This will end up in your console (or wherever you redirect stdout/stderr)
        console.error(`––– Failed request to ${msgRes.request.url} –––`);
        console.error(`Status: ${msgRes.status} ${msgRes.status_text}`);
        console.error('Response headers:', JSON.stringify(msgRes.headers));
        console.error('Body:', msgRes.body);
    }



    sleep(1);
}
