document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Calculate score
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);
    
    if (answers.length !== 5) {
        alert('Please answer all questions');
        return;
    }
    
    const score = answers.reduce((acc, val) => acc + val.charCodeAt(0), 0) / answers.length;
    
    // Determine result
    let result, analysis;
    if (score >= 67) {
        result = 'A: Advanced';
        analysis = 'Your email marketing strategy is well-developed! Let us help you optimize further.';
    } else if (score >= 66) {
        result = 'B: Moderate';
        analysis = 'You have a good foundation, but there\'s room for improvement.';
    } else if (score >= 65) {
        result = 'C: Needs Improvement';
        analysis = 'Your email marketing could use some work.';
    } else {
        result = 'D: No Strategy';
        analysis = 'It\'s time to start building your email marketing strategy.';
    }
    
    // Show results
    document.getElementById('resultText').textContent = result;
    document.getElementById('resultAnalysis').textContent = analysis;
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We\'ll be in touch soon with personalized suggestions.');
});