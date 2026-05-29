import { readFile } from 'node:fs/promises';
import { stdin, argv, exit } from 'node:process';
import { sourceToHornSmt2 } from '../src/primrecLanguage';

async function main() {
  try {
    const source = await readSource(argv.slice(2));
    console.log(sourceToHornSmt2(source));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    exit(1);
  }
}

async function readSource(args: string[]): Promise<string> {
  if (args[0] === '--file' || args[0] === '-f') {
    if (!args[1]) {
      throw new Error('Expected a file path after --file.');
    }
    return readFile(args[1], 'utf8');
  }

  if (args.length > 0) {
    return args.join(' ');
  }

  return readStdin();
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

await main();
