const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// إعدادات
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// استقبال الصفحة الأساسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// استقبال الإجابات وحساب النتيجة
app.post('/submit', (req, res) => {
  const answers = req.body;
  let total = 0;
  const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
  const maxTotal = questions.length;

  questions.forEach(q => {
    const val = parseFloat(answers[q]);
    total += isNaN(val) ? 0 : val;
  });

  const percentage = (total / maxTotal) * 100;
  const diagnosis = percentage >= 50 ? 'تشخيص: توحد' : 'تشخيص: غير مصاب بالتوحد';

  // إرسال صفحة HTML كاملة فيها النتيجة
  res.send(`
    <!DOCTYPE html>
    <html lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>نتيجة التشخيص</title>
    </head>
    <body dir="rtl">
      <h2>النتيجة</h2>
      <p>النسبة المئوية: ${percentage.toFixed(2)}%</p>
      <p>${diagnosis}</p>
      <a href="/">العودة للاختبار</a>
    </body>
    </html>
  `);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
