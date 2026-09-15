import { spawn } from 'child_process';

const rawArgs = process.argv.slice(2);
let port = '3000';
let host = '0.0.0.0';
const extraArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg.startsWith('--port=')) {
    port = arg.split('=')[1];
  } else if (arg === '--port' || arg === '-p') {
    if (i + 1 < rawArgs.length) {
      port = rawArgs[++i];
    }
  } else if (arg.startsWith('--host=')) {
    host = arg.split('=')[1];
  } else if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    if (i + 1 < rawArgs.length) {
      host = rawArgs[++i];
    }
  } else {
    extraArgs.push(arg);
  }
}

const nextArgs = ['dev', '-p', port, '-H', host, ...extraArgs];

const child = spawn('./node_modules/.bin/next', nextArgs, {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (err) => {
  console.error('Failed to start Next dev server:', err);
  process.exit(1);
});
