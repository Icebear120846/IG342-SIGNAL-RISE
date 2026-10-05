# IG342 APP BLUEPRINT — 1 WEEK DEMO

อ้างอิง: `_PROJECT_LOCK.md` เป็น Source of Truth สูงสุด
สถานะ: READY FOR IMPLEMENTATION

## 1) เป้าหมายของเวอร์ชันส่งอาจารย์
สร้าง Demo ที่เล่นได้จริง 1 Chapter ภายใน 1 สัปดาห์ โดยยังคงความเป็นแอปพัฒนาตัวเองและฟีล RPG อวกาศ

Core Loop:
Mission ชีวิตจริง -> รับ EXP/Stat/Resource/Warp -> ซ่อมยาน -> เปิด Galaxy -> Event -> Memory Log -> กลับมาทำ Mission

## 2) Screen Flow หลัก
Launch
-> Command
-> Missions
-> Mission Complete / Reward
-> Ship Upgrade
-> Galaxy
-> Random Event
-> Memory Log #01
-> กลับ Command

## 3) Main Navigation
1. Command
2. Missions
3. Galaxy
4. Ship
5. Inventory
6. Captain

มือถือใช้ Bottom Navigation เป็นหลัก และหน้าจอใหญ่ใช้ Sidebar หรือ Navigation Rail ได้ แต่ข้อมูลและ Route ต้องเหมือนกัน

## 4) รายละเอียดแต่ละหน้า
### Command
- Hero: ยาน + ชื่อ Captain + AI Orb
- แสดง Level, EXP, Warp, Ship Status
- AI Companion แนะนำ 1-3 Mission
- ปุ่ม Continue Mission / Go to Ship / Open Galaxy
- แสดง Chapter 1 Milestone ปัจจุบัน

### Missions
- Tabs: Suggested / My Missions / Completed
- Template Mission + Custom Mission
- ฟิลด์: ชื่อ, หมวด, Difficulty, Priority, Deadline/Time Window
- ปุ่ม Complete Mission
- Complete แล้วเปิด Reward Modal

### Galaxy
- Hologram Node Map แบบ Minimal
- Node ปลดล็อกตาม Milestone
- แสดง Warp Cost / Threat / Reward แบบย่อ
- V1 ใช้ Node เท่าที่จำเป็นกับ Chapter 1

### Ship
- แสดง Power / Scanner / Navigation / Hull แบบ Card
- ซ่อม/อัปเกรดด้วย Resource
- V1 ทำเฉพาะระบบที่ใช้ใน Chapter 1

### Inventory
- Resource หลัก
- Bonus Loot / Data / Artifact placeholder
- ไม่มีระบบ Craft ลึกใน V1

### Captain
- แสดง Level + Rank
- 4 Stats: Knowledge / Physical / Command / Vital
- Streak + Recovery Charge แบบย่อ
- Profile setting ที่จำเป็นเท่านั้น

## 5) Chapter 1 — 5 Milestone
1. Emergency Wake
   - เปิดเรื่อง, AI Companion ตื่น, สอน Mission
2. Restore Power
   - ทำ Mission -> รับ Resource -> ซ่อม Power
3. Repair Scanner
   - ทำ Mission -> ซ่อม Scanner -> ตรวจพบ Unknown Signal
4. Charge the Warp
   - สะสม Warp Energy -> เปิด Galaxy Node แรก
5. Unknown Signal
   - Jump -> Random Event -> Memory Log #01 -> จบบท

## 6) AI Companion V1
ทำแบบ Rule-based เท่านั้น ไม่ใช้ AI API
หน้าที่:
- แนะนำ Mission 1-3 ตัวเลือก
- พิจารณา Priority / Deadline / เวลาว่าง / Stats / งานค้าง
- Auto Assign เปิด/ปิดได้
- สรุปความคืบหน้าสั้น ๆ
- ใช้ข้อความแบบสุขุม มืออาชีพ และกวนเล็กน้อย

ตัวอย่างข้อความ:
- "Captain, ภารกิจนี้ใกล้หมดเวลาแล้ว"
- "Warp drive ready"
- "วันนี้ยังเหลือ 2 Mission หลักครับ"

## 7) ข้อมูลที่ต้องเซฟใน Local Storage
- Captain profile: name, level, exp, rank
- Stats: knowledge, physical, command, vital
- Missions: active, completed, custom
- Resources + Warp Energy
- Ship systems status / upgrade level
- Chapter milestone / unlocked galaxy node
- Inventory แบบพื้นฐาน
- Streak / Recovery Charge
- App mode: Casual / Challenge

## 8) UI Direction — LOCKED FOR V1
- Dark base
- Minimal Future + Cyber/Neon accent
- Card UI อ่านง่าย
- Hologram effect ใช้เฉพาะจุดสำคัญ
- Mobile-first
- Animation สั้นและเบา
- ห้ามทำ HUD แน่นจนใช้งานยาก

## 9) V1 Must Work Checklist
- Route ทุกหน้ากดเข้าได้
- สร้าง Mission ได้
- Complete Mission แล้วรางวัลเปลี่ยนจริง
- Stats / Resource / Warp เซฟและโหลดได้
- ซ่อม Power / Scanner ได้
- Milestone เดินต่อได้ตามเงื่อนไข
- Galaxy Node แรกปลดล็อกได้
- Event เลือกคำตอบได้และมีผล
- Memory Log #01 ปลดล็อกได้
- Responsive บนมือถือ

## 10) ลำดับทำงาน 7 วัน
Day 1: Project setup + Routes + Layout + Data model
Day 2: Missions + Local Storage
Day 3: Reward / Stats / AI Rule-based
Day 4: Ship systems + Chapter progression
Day 5: Galaxy + Event + Memory Log
Day 6: UI polish + responsive + animation/audio เบา ๆ
Day 7: QA / bug fix / build / เตรียมพรีเซนต์

## 11) Scope Guard
ห้ามเพิ่มระบบนอก `_PROJECT_LOCK.md` และไฟล์นี้โดยพลการ
ถ้ามีไอเดียใหม่ ให้เขียนเป็น FUTURE/DEFERRED ก่อน ห้ามแทรกเข้า V1 โดยไม่อนุมัติ
