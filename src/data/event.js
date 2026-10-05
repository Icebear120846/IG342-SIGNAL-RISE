// Chapter 1's single fixed Random Event — no generator, no procedural randomness
// (see _PROJECT_LOCK.md #6: "Random Event มีตัวเลือกและมีผลต่อยานหรือ Resource")

export const UNKNOWN_SIGNAL_EVENT = {
  id: 'event-unknown-signal',
  title: 'Unknown Signal',
  description:
    'เสียงประหลาดแทรกเข้ามาในคลื่นความถี่ของยาน มันฟังดูคุ้นเคยราวกับเคยได้ยินมาก่อน... AI Companion ของคุณเงียบไปชั่วขณะก่อนจะตอบสนอง',
  choices: [
    {
      id: 'investigate',
      label: 'ตรวจสอบสัญญาณอย่างละเอียด',
      resultText:
        'คุณกู้ข้อมูลเสียหายบางส่วนออกมาได้ มันดูเหมือนบันทึกเก่าของยานลำนี้เอง... แต่ทำไมมันถึงอยู่ในสัญญาณนี้ได้ครับ Captain',
      effects: {
        resources: { dataCores: 15 },
        flags: { investigatedSignal: true },
      },
    },
    {
      id: 'ignore',
      label: 'เพิกเฉยแล้วเดินหน้าต่อ',
      resultText:
        'คุณเลือกที่จะไม่ยุ่งกับมันและปิดช่องสัญญาณ แต่ระบบยานสั่นเบา ๆ ราวกับไม่เห็นด้วย',
      effects: {
        warpEnergy: -5,
        flags: { ignoredSignal: true },
      },
    },
    {
      id: 'ask-companion',
      label: 'ถาม AI Companion ตรง ๆ ว่ารู้อะไรไหม',
      resultText:
        'AI Companion ตอบช้ากว่าปกติเล็กน้อยก่อนพูดว่า "ผมก็ไม่แน่ใจครับ Captain... แต่รู้สึกคุ้น ๆ อย่างบอกไม่ถูก"',
      effects: {
        inventoryItem: { type: 'data', name: 'Fragment: Familiar Voice' },
        flags: { askedCompanion: true },
      },
    },
  ],
}
