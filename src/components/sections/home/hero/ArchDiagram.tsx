import { hero } from '../../../../content/home';

/**
 * Hero line diagram: learners → one HTTPS entry point → an isolated
 * environment per learner, with the trainer's console feeding the same entry.
 *
 * Two hand-tuned layouts share one renderer: `wide` (≥640px, 560 units across,
 * drawn at roughly 1:1 on desktop) and `narrow` (phones, 328 units = 1:1 at 360px).
 * Every position is computed from the spec below, so the render is deterministic
 * and prerender-safe. The SVG is decorative (aria-hidden); the visible figcaption
 * carries its meaning in text.
 */

type Variant = 'wide' | 'narrow';

const C = {
  line: 'var(--ink-600)',
  node: 'var(--ink-900)',
  bg: 'var(--ink-950)',
  text: 'var(--slate-300)', // 12.6:1 on ink-950
  label: 'var(--slate-400)', // 7:1 on ink-950
  white: 'var(--white)',
  accent: 'var(--blue-400)',
};

const mono = { fontFamily: 'var(--font-mono)' } as const;
const sans = { fontFamily: 'var(--font-sans)' } as const;

/** Smallest text in the diagram, in SVG units (≈ CSS px at the sizes it is drawn). */
const FS = 12;
/** Geist Mono advance width is 0.6em; most monospace fallbacks are ≤ 0.6em too. */
const monoWidth = (text: string, size = FS, tracking = 0) => text.length * size * (0.6 + tracking);

type Spec = {
  W: number;
  learners: string[];
  learnerW: number;
  learnerGlyph: boolean;
  busY: number;
  entryY: number;
  entryW: number;
  entryH: number;
  fanY: number;
  groupsY: number;
  groupGap: number;
  cols: number;
  nodeH: number;
  nodeGap: number;
  /** Trainer node, guardrail notes and the HTTPS side note (wide only). */
  sides: boolean;
  bandGap: number;
  /** Course codes inside the official-labs band, one string per line. */
  codes: string[];
};

const { diagram } = hero;

const specs: Record<Variant, Spec> = {
  wide: {
    W: 560,
    learners: diagram.learnersWide,
    learnerW: 116,
    learnerGlyph: true,
    busY: 62,
    entryY: 104,
    entryW: 232,
    entryH: 60,
    fanY: 236,
    groupsY: 266,
    groupGap: 16,
    cols: 2,
    nodeH: 34,
    nodeGap: 8,
    sides: true,
    bandGap: 26,
    codes: [diagram.official.codesWide],
  },
  narrow: {
    W: 328,
    learners: diagram.learnersNarrow,
    learnerW: 100,
    learnerGlyph: false,
    busY: 62,
    entryY: 104,
    entryW: 232,
    entryH: 60,
    fanY: 204,
    groupsY: 234,
    groupGap: 14,
    cols: 1,
    nodeH: 30,
    nodeGap: 6,
    sides: false,
    bandGap: 24,
    codes: diagram.official.codesNarrow,
  },
};

const R = 8; // corner radius of connector elbows
const ACTOR_H = 36;
const GROUP_HEAD = 28;
const GROUP_PAD = 10;
const LINE = 17; // line height for mono notes

/** Down → across at yMid → down, with rounded corners. Path segments without the leading M. */
function elbow(x1: number, x2: number, yMid: number, y2: number) {
  if (x1 === x2) return `V ${y2}`;
  const d = Math.sign(x2 - x1);
  return `V ${yMid - R} Q ${x1} ${yMid} ${x1 + d * R} ${yMid} H ${x2 - d * R} Q ${x2} ${yMid} ${x2} ${yMid + R} V ${y2}`;
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

/** A pill-shaped tag sitting on a vertical connector, knocked out of the line. */
function LineTag({ x, y, label }: { x: number; y: number; label: string }) {
  const w = monoWidth(label, FS, 0.04) + 24;
  return (
    <g>
      <rect x={x - w / 2} y={y - 10.5} width={w} height={21} rx={10.5} fill={C.bg} stroke={C.line} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={FS} letterSpacing="0.04em" fill={C.text} style={mono}>
        {label}
      </text>
    </g>
  );
}

/**
 * Uppercase mono label knocked out of a dashed border, centred on x. With `port`, a connector
 * lands on the label from above: the knockout reaches higher so the line stops short of the text.
 */
function BorderLabel({ x, y, label, upper = true, port = false }: { x: number; y: number; label: string; upper?: boolean; port?: boolean }) {
  const tracking = upper ? 0.08 : 0;
  const w = monoWidth(label, FS, tracking) + 14;
  const rx = x - w / 2;
  const top = port ? 12 : 7;
  return (
    <g>
      <rect x={rx} y={y - top} width={w} height={top + 7} fill={C.bg} />
      <text
        x={rx + 7}
        y={y + 4}
        fontSize={FS}
        letterSpacing={upper ? '0.08em' : undefined}
        fill={upper ? C.label : C.text}
        style={mono}
      >
        {upper ? label.toUpperCase() : label}
      </text>
    </g>
  );
}

/** Person glyph used for learners and the trainer. */
function Person({ x, y, on }: { x: number; y: number; on: boolean }) {
  const stroke = on ? C.accent : C.label;
  return (
    <g stroke={stroke} fill="none">
      <circle cx={x} cy={y - 3} r={2.75} />
      <path d={`M ${x - 5} ${y + 6.5} a 5 4.5 0 0 1 10 0`} />
    </g>
  );
}

/** A labelled box for a person: learners on top, the trainer at the side. */
function Actor({ x, y, w, label, glyph, on = false }: { x: number; y: number; w: number; label: string; glyph: boolean; on?: boolean }) {
  return (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={ACTOR_H - 1} rx={8} fill={C.node} stroke={on ? C.accent : C.line} />
      {glyph ? <Person x={x + 17} y={y + ACTOR_H / 2} on={on} /> : null}
      <text
        x={glyph ? x + 30 : x + w / 2}
        y={y + ACTOR_H / 2 + 4}
        textAnchor={glyph ? 'start' : 'middle'}
        fontSize={FS}
        fill={on ? C.white : C.text}
        style={mono}
      >
        {label}
      </text>
    </g>
  );
}

export function ArchDiagram({ variant, className = '' }: { variant: Variant; className?: string }) {
  const s = specs[variant];
  const cx = s.W / 2;

  // Learners, spread across the full width
  const lGap = (s.W - s.learners.length * s.learnerW) / (s.learners.length - 1);
  const learners = s.learners.map((label, i) => {
    const x = i * (s.learnerW + lGap);
    return { label, x, cx: x + s.learnerW / 2 };
  });

  // Entry point
  const entryX = cx - s.entryW / 2;
  const entryBottom = s.entryY + s.entryH;
  const entryCy = s.entryY + s.entryH / 2;

  // Environment groups
  const gW = (s.W - s.groupGap) / 2;
  const nodeW = (gW - GROUP_PAD * 2 - (s.cols - 1) * s.nodeGap) / s.cols;
  const groups = diagram.groups.map((g, gi) => {
    const x = gi * (gW + s.groupGap);
    const rows = Math.ceil(g.items.length / s.cols);
    const h = GROUP_HEAD + rows * s.nodeH + (rows - 1) * s.nodeGap + GROUP_PAD;
    const nodes = g.items.map((name, ii) => ({
      name,
      x: x + GROUP_PAD + (ii % s.cols) * (nodeW + s.nodeGap),
      y: s.groupsY + GROUP_HEAD + Math.floor(ii / s.cols) * (s.nodeH + s.nodeGap),
      traced: gi === diagram.tracedTarget[0] && ii === diagram.tracedTarget[1],
    }));
    return { ...g, x, cx: x + gW / 2, h, nodes };
  });

  // Official course labs band, under both groups
  const official = diagram.official;
  const bandY = s.groupsY + Math.max(...groups.map((g) => g.h)) + s.bandGap;
  const bandLines = s.codes;
  const bandH = 26 + bandLines.length * LINE + 10;
  const H = bandY + bandH + 8; // room for the count knocked out of the band's bottom border

  // Connectors: learner bus → entry; entry → each group; a trunk straight down to the band
  const learnerPaths = learners.map((l) => `M ${l.cx} ${ACTOR_H} ${elbow(l.cx, cx, s.busY, s.entryY)}`);
  const groupPaths = groups.map((g) => `M ${cx} ${entryBottom} ${elbow(cx, g.cx, s.fanY, s.groupsY)}`);
  const trunk = `M ${cx} ${entryBottom} V ${bandY}`;

  const traced = learners[diagram.tracedLearner];
  const target = groups[diagram.tracedTarget[0]];
  const tracedPath = `M ${traced.cx} ${ACTOR_H} ${elbow(traced.cx, cx, s.busY, s.entryY)} V ${entryBottom} ${elbow(cx, target.cx, s.fanY, s.groupsY)}`;

  // Trainer node (wide only): left of the entry point, on its centre line
  const trainerW = s.learnerW;
  const trainerY = entryCy - ACTOR_H / 2;
  const httpsY = (s.busY + R + s.entryY) / 2;
  const httpsTagW = monoWidth(diagram.httpsTag, FS, 0.04) + 24;

  return (
    <svg
      viewBox={`0 0 ${s.W} ${H}`}
      width="100%"
      className={`block h-auto overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {/* Connectors */}
      <g stroke={C.line} strokeWidth={1}>
        {learnerPaths.map((d) => (
          <path key={d} d={d} />
        ))}
        {groupPaths.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={trunk} />
        {s.sides ? <path d={`M ${trainerW} ${entryCy} H ${entryX}`} /> : null}
      </g>

      {/* The traced learner's route, then the travelling pulse. Both layouts are in the DOM
          (one is display:none), so the hidden copy's animation never paints. Hidden entirely
          under prefers-reduced-motion. */}
      <path d={tracedPath} stroke={C.accent} strokeOpacity={0.9} strokeWidth={1} />
      <path
        d={tracedPath}
        pathLength={100}
        stroke={C.white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="6 120"
        strokeDashoffset={6}
        className="motion-reduce:hidden"
      >
        {/* Starts after the page has settled so it never competes with loading. */}
        <animate attributeName="stroke-dashoffset" values="6;-100;-100" keyTimes="0;0.72;1" dur="4.2s" begin="5s" repeatCount="indefinite" />
      </path>

      {/* Learners */}
      {learners.map((l, i) => (
        <Actor key={l.label} x={l.x} y={0} w={s.learnerW} label={l.label} glyph={s.learnerGlyph} on={i === diagram.tracedLearner} />
      ))}

      <LineTag x={cx} y={httpsY} label={diagram.httpsTag} />

      {s.sides ? (
        <g style={mono} fontSize={FS} fill={C.text}>
          {/* How learners connect */}
          <text x={cx + httpsTagW / 2 + 14} y={httpsY + 4}>
            {diagram.httpsNote}
          </text>

          {/* Trainer and what the console does */}
          <Actor x={0} y={trainerY} w={trainerW} label={diagram.trainer.label} glyph />
          {diagram.trainer.notes.map((t, i) => (
            <text key={t} x={1} y={trainerY + ACTOR_H + 22 + i * LINE}>
              {t}
            </text>
          ))}

          {/* Guardrails applied by the platform */}
          <path d={`M ${entryX + s.entryW} ${entryCy} H ${entryX + s.entryW + 22}`} stroke={C.line} strokeDasharray="2 3" />
          {diagram.guardrails.map((t, i) => (
            <text key={t} x={entryX + s.entryW + 30} y={entryCy - LINE + i * LINE + 4}>
              {t}
            </text>
          ))}
        </g>
      ) : null}

      {/* Entry point */}
      <g>
        <rect x={entryX + 0.5} y={s.entryY + 0.5} width={s.entryW - 1} height={s.entryH - 1} rx={10} fill={C.node} stroke={C.accent} strokeOpacity={0.7} />
        <polygon points={hexPoints(entryX + 30, entryCy, 12)} stroke={C.accent} />
        <polygon points={hexPoints(entryX + 30, entryCy, 5)} fill={C.accent} />
        <text x={entryX + 54} y={entryCy - 3} fontSize={15} fontWeight={600} fill={C.white} style={sans}>
          {diagram.entry.name}
        </text>
        <text x={entryX + 54} y={entryCy + 14} fontSize={FS} fill={C.text} style={mono}>
          {diagram.entry.host}
        </text>
      </g>

      <LineTag x={cx} y={(entryBottom + s.fanY - R) / 2} label={diagram.isolationTag} />

      {/* Environment groups: plain boxes, no icons, so they read as environments rather than controls */}
      {groups.map((g) => (
        <g key={g.label}>
          <rect x={g.x + 0.5} y={s.groupsY + 0.5} width={gW - 1} height={g.h - 1} rx={12} stroke={C.line} strokeDasharray="3 4" />
          {/* Centred on the connector that feeds the group, so the line ends in its label */}
          <BorderLabel x={g.cx} y={s.groupsY} label={g.label} port />
          {g.nodes.map((n) => (
            <g key={n.name}>
              <rect
                x={n.x + 0.5}
                y={n.y + 0.5}
                width={nodeW - 1}
                height={s.nodeH - 1}
                rx={6}
                fill={C.node}
                stroke={n.traced ? C.accent : C.line}
              />
              <text x={n.x + 12} y={n.y + s.nodeH / 2 + 4.5} fontSize={13} fill={n.traced ? C.white : C.text} style={sans}>
                {n.name}
              </text>
            </g>
          ))}
        </g>
      ))}

      {/* Official course labs: a thin band under both groups, fed by the trunk */}
      <g>
        <rect x={0.5} y={bandY + 0.5} width={s.W - 1} height={bandH - 1} rx={12} stroke={C.line} strokeDasharray="3 4" />
        <BorderLabel x={cx} y={bandY} label={official.label} port />
        <BorderLabel x={cx} y={bandY + bandH} label={official.count} upper={false} />
        {bandLines.map((t, i) => (
          <text key={t} x={cx} y={bandY + 28 + i * LINE} textAnchor="middle" fontSize={FS} fill={C.text} style={mono}>
            {t}
          </text>
        ))}
      </g>
    </svg>
  );
}
