# IG342 PROJECT LOCK — Source of Truth

สถานะ: LOCKED FOR 1-WEEK DEMO
เป้าหมาย: กัน Scope หลุด, ห้ามเพิ่มระบบเอง, ใช้ไฟล์นี้เป็น Source of Truth ก่อนแก้/เพิ่มฟีเจอร์ทุกครั้ง

## 1) Core Concept — LOCKED
แอปพัฒนาตัวเองสไตล์ RPG อวกาศ ผู้ใช้คือ Captain ของยานที่เสียหายกลางอวกาศ มี AI Companion แบบ Hologram Orb คอยช่วยแนะนำภารกิจในชีวิตจริง

ชีวิตจริงของผู้ใช้ -> Mission -> EXP / Stats / Resource / Warp Energy -> ซ่อมและอัปเกรดยาน -> เดินทางใน Galaxy -> เจอ Event / Mystery -> ปลด Memory Log

## 2) Core Loop — LOCKED
1. รับ/สร้าง Mission ในชีวิตจริง
2. ทำ Mission ให้สำเร็จ
3. รับ EXP + Stat + Resource + Warp Energy
4. ใช้ Resource ซ่อม/อัปเกรดยาน
5. เติม Warp Charge
6. เลือก Node บน Galaxy Map และ Jump
7. เจอ Event / เนื้อเรื่อง / Memory Log
8. กลับมาทำ Mission ต่อ

## 3) Main Theme — LOCKED
- Minimal Future + Cyber / Neon
- Dark UI, สะอาด, พรีเมียม, ใช้ง่าย
- ฟีล Command Center แต่ต้องยังเป็นแอป ไม่ใช่เกมเต็มรูปแบบ
- ผู้ใช้ = Captain
- AI Companion = Hologram Orb, สุขุม ฉลาด มืออาชีพ + กวนเล็กน้อย

## 4) V1 Demo Scope — LOCKED
ต้องทำจริงภายใน 1 สัปดาห์:
- Command Dashboard
- Mission Template + Custom Mission
- Mission Difficulty
- EXP + 4 Stats: Knowledge / Physical / Command / Vital
- Resource พื้นฐาน + Warp Energy
- AI Companion แนะนำ Mission แบบ Rule-based
- Ship Status + ซ่อม/อัปเกรดระบบหลัก
- Galaxy Map แบบ Hologram Node
- Chapter 1 จำนวน 5 Milestone
- Random Event แบบมีตัวเลือกและผลลัพธ์
- Memory Log #01
- Inventory แบบพื้นฐาน
- Local Storage
- Responsive Mobile UI

## 5) Chapter 1 — LOCKED
Milestone 1: Emergency Wake
Milestone 2: Restore Power
Milestone 3: Repair Scanner
Milestone 4: Charge the Warp
Milestone 5: Unknown Signal -> Event แรก -> Memory Log #01

Mission ใน Chapter 1 ต้องมีทั้งระบบแนะนำตาม Milestone และผู้ใช้สร้างเองได้
AI Companion แนะนำ 1-3 Mission จาก Priority / Deadline / เวลาว่าง / Stats / งานค้าง
Auto Assign เปิด-ปิดได้

## 6) Locked Game-Like Systems
- Mission Reward = EXP + Stat + Resource + Bonus Loot ตาม Difficulty
- Mission Fail: Casual = เตือน/แซว, Challenge = เสีย Bonus เล็กน้อย/กระทบยานเล็กน้อย
- Streak มี Recovery ไม่รีเซ็ตศูนย์ทันที
- Streak Reward = Cosmetic / Badge / Effect เท่านั้น
- Recovery Charge ได้จาก Achievement / Weekly Mission / Credits บางส่วน
- Achievement มีแบบทั่วไป / ลับ / เนื้อเรื่อง / พฤติกรรมจริง
- Random Event มีตัวเลือกและมีผลต่อยานหรือ Resource
- Main Story มี Ending หลัก และ Secret Ending ถูกวางไว้สำหรับอนาคต

## 7) Main Navigation — LOCKED
1. Command
2. Missions
3. Galaxy
4. Ship
5. Inventory
6. Captain

## 8) Deferred / Mock Only — NOT V1
- Cosmetic Shop เต็มระบบ
- Ship Interior Cutaway แบบละเอียด
- Crafting / Blueprint ลึก
- Artifact จำนวนมาก
- Achievement จำนวนมาก
- Secret Ending ใช้งานเต็ม
- หลาย Chapter
- Push Notification จริง
- Voice AI เต็มรูปแบบ
- Shop / Economy เต็มระบบ

## 9) Explicitly Forbidden for the 1-Week Demo
ห้ามเพิ่มเองโดยไม่ได้รับอนุมัติ:
- AI API เสียเงิน
- Login / Cloud Database
- ระบบเติมเงินจริง
- Multiplayer
- 3D
- ระบบ Economy ขนาดใหญ่
- Full Story หลาย Chapter
- Feature ใหม่ที่เปลี่ยน Core Loop

## 10) Change-Control Rule — LOCKED
ก่อนเพิ่ม/แก้ระบบใด ๆ ต้องเช็กไฟล์นี้ก่อนเสมอ
ถ้าของใหม่ขัดกับ LOCKED ให้หยุดและขออนุมัติก่อน
ถ้าไม่อยู่ใน V1 Scope ให้ถือเป็น Deferred โดยอัตโนมัติ
ห้ามเพิ่ม Feature เพราะ "ดูเท่" ถ้าไม่ช่วย Core Loop หรือการพรีเซนต์
Priority สูงสุด: ทำ Demo ให้เล่นได้จริง > ความสวย > ระบบเสริม

## 11) One-Week Delivery Principle
เป้าหมายคือ Demo 1 Chapter ที่เล่นได้จริง ไม่ใช่ Full Game
ทุกการตัดสินใจต้องตอบคำถามว่า: "ช่วยให้ Demo เสร็จภายใน 1 สัปดาห์ไหม?"
ถ้าไม่ช่วย ให้ตัด/Mock/Deferred

## 12) Current Naming Status — LOCKED
ชื่อแอป Final: SIGNAL//RISE
Tagline หลัก: Awaken. Repair. Rise.
Branding direction: Self-improvement + Mystery Sci-Fi
ห้ามเปลี่ยนชื่อ Final โดยไม่ได้รับอนุมัติ
