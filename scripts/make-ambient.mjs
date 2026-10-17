import { mkdirSync, writeFileSync } from 'node:fs'

const sampleRate = 44100
const seconds = 24
const n = sampleRate * seconds
const left = new Float32Array(n)
const right = new Float32Array(n)

function freq(note) {
  return 440 * 2 ** ((note - 69) / 12)
}

function env(t, attack, release, dur) {
  if (t < 0 || t > dur) return 0
  if (t < attack) return t / attack
  if (t > dur - release) return Math.max(0, (dur - t) / release)
  return 1
}

const chords = [
  [48, 52, 55, 59, 64],
  [45, 48, 52, 57, 64],
  [41, 45, 48, 52, 60],
  [43, 47, 50, 55, 62],
]

const bar = 3
for (let i = 0; i < n; i++) {
  const t = i / sampleRate
  const chord = chords[Math.floor((t / bar) % chords.length)]
  const local = t % bar
  let sample = 0
  for (const note of chord) {
    const f = freq(note)
    sample += Math.sin(2 * Math.PI * f * t) * 0.11 * env(local, 0.08, 0.9, bar)
    sample += Math.sin(2 * Math.PI * f * 2 * t) * 0.03 * env(local, 0.1, 0.9, bar)
  }
  sample += Math.sin(2 * Math.PI * freq(36) * t) * 0.08
  const hat = ((Math.random() * 2 - 1) * Math.max(0, 1 - (t % 0.5) * 8)) * 0.02
  sample += hat
  const fade =
    t < 0.4 ? t / 0.4 : t > seconds - 0.4 ? (seconds - t) / 0.4 : 1
  sample *= fade * 0.92
  left[i] = sample
  right[i] = sample * 0.96 + Math.sin(2 * Math.PI * 0.12 * t) * 0.01
}

function encodeWav(l, r) {
  const dataSize = n * 4
  const buf = Buffer.alloc(44 + dataSize)
  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + dataSize, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)
  buf.writeUInt16LE(2, 22)
  buf.writeUInt32LE(sampleRate, 24)
  buf.writeUInt32LE(sampleRate * 4, 28)
  buf.writeUInt16LE(4, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(dataSize, 40)
  let o = 44
  for (let i = 0; i < n; i++) {
    const ls = Math.max(-1, Math.min(1, l[i]))
    const rs = Math.max(-1, Math.min(1, r[i]))
    buf.writeInt16LE((ls * 32767) | 0, o)
    buf.writeInt16LE((rs * 32767) | 0, o + 2)
    o += 4
  }
  return buf
}

mkdirSync('public/audio', { recursive: true })
writeFileSync('public/audio/ambient.wav', encodeWav(left, right))
console.log('wrote public/audio/ambient.wav')
