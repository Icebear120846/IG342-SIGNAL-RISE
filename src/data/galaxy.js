// Galaxy Node data model (see _APP_BLUEPRINT.md #4 Galaxy)
// V1 uses exactly one real destination Node for the Chapter 1 Demo.

export const GALAXY_NODES = [
  {
    id: 'node-unknown-signal',
    name: 'Unknown Signal',
    warpCost: 40,
    threat: 'Unknown',
    summary: 'สัญญาณประหลาดที่ Scanner จับได้หลังยานกลับมาใช้งานได้อีกครั้ง',
  },
]

export function createGalaxyState() {
  return {
    nodes: GALAXY_NODES.map((node) => ({ ...node })),
  }
}
