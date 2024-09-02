export const updateInterface = (data) => {
    if (!data || typeof data !== 'object') {
      console.error('Invalid data for updateInterface');
      return;
    }
  
    const polarityElement = document.getElementById('polarity');
    const subjectivityElement = document.getElementById('subjectivity');
    const textElement = document.getElementById('text');
  
    if (polarityElement) {
      polarityElement.textContent = `Polarity: ${data.polarity}`;
    }
  
    if (subjectivityElement) {
      subjectivityElement.textContent = `Subjectivity: ${data.subjectivity}`;
    }
  
    if (textElement) {
      textElement.textContent = `Text: ${data.text}`;
    }
  }
  