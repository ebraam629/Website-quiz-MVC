exports.submitAnswers = (req, res) => {
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

  res.render('result', {
    percentage: percentage.toFixed(2),
    diagnosis
  });
};
