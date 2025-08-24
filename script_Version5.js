// index.html logic: handle platform selection
if (document.querySelector('.platform-bar')) {
  document.querySelectorAll('.platform-bar').forEach(bar => {
    bar.onclick = () => {
      const platform = bar.getAttribute('data-platform');
      localStorage.setItem('selectedPlatform', platform);
      window.location.href = 'predict.html';
    };
  });
}

// predict.html logic: show Aviator bar and prediction
if (document.getElementById('aviator-container')) {
  const platform = localStorage.getItem('selectedPlatform') || 'betika';
  // Example data per platform; you can expand this or fetch from backend
  const platformData = {
    betika: {
      history: "9.36x 5.88x 1.11x 1.51x 1.00x 4.34x 2.67x 2.29x 4.91x 2.14x 26.58x 1.00x",
      current: "1.71x",
      amount: "10.00"
    },
    odi: {
      history: "8.11x 2.55x 3.00x 1.90x 2.01x 5.11x 1.13x 2.77x 3.99x 2.33x 8.12x 2.00x",
      current: "2.03x",
      amount: "20.00"
    },
    shabiki: {
      history: "4.21x 1.77x 9.99x 3.24x 1.55x 8.88x 1.11x 3.33x 6.66x 2.22x 7.77x 4.44x",
      current: "5.01x",
      amount: "15.00"
    },
    sportpesa: {
      history: "7.77x 2.22x 3.33x 4.44x 1.00x 9.99x 2.11x 3.33x 4.44x 1.50x 6.66x 2.00x",
      current: "4.44x",
      amount: "50.00"
    }
  };
  const data = platformData[platform] || platformData.betika;

  // Render Aviator bar
  document.getElementById('aviator-container').innerHTML = `
    <div style="width:300px; background:#111; color:#fff; font-family:sans-serif; border-radius:8px; overflow:hidden;">
      <div style="padding:10px; background:radial-gradient(circle at center, #0a0a0a, #111); text-align:center;">
        <div style="color:#bada55; font-size:16px; margin-bottom:6px;">
          ${data.history}
        </div>
        <div style="font-size:48px; font-weight:bold; color:#fff; margin:6px 0;">
          ${data.current}
        </div>
        <div style="width:100%; height:120px; background:linear-gradient(to top right, transparent 30%, #f00 100%); clip-path: polygon(0 100%, 100% 0, 100% 100%); position: relative;">
          <svg style="position:absolute; top:0; right:10px; width:40px; height:40px; fill:#f00;" viewBox="0 0 24 24">
            <path d="M2 16l15-4-15-4v3l11 1-11 1v3z"/>
          </svg>
        </div>
      </div>
      <div style="padding:10px; background:#222;">
        <div style="display:flex; justify-content:space-around; margin-bottom:10px;">
          <button style="background:#222; border:none; color:#fff; padding:6px 12px; border-radius:4px;">-</button>
          <input type="text" value="${data.amount}" style="width:50px; text-align:center; border:none; border-radius:4px;"/>
          <button style="background:#222; border:none; color:#fff; padding:6px 12px; border-radius:4px;">+</button>
        </div>
        <div style="display:flex; justify-content:space-around; margin-bottom:10px; color:#888; font-size:12px;">
          <span>100</span>
          <span>200</span>
          <span>500</span>
          <span>20,000</span>
        </div>
        <button style="background:#0a0; border:none; width:100%; padding:10px; font-weight:bold; color:#fff; border-radius:6px; font-size:16px;">
          Bet ${data.amount} KES
        </button>
      </div>
    </div>
  `;

  // Predict button logic: In real app, this should call backend API (see previous backend example)
  document.getElementById('predict-btn').onclick = () => {
    document.getElementById('predict-btn').disabled = true;
    document.getElementById('prediction-result').textContent = "Predicting...";
    setTimeout(() => {
      // Simulate scraping logic using selectors (advanced seed logic example)
      // Try multiple selectors: Here, we use the history numbers as "scraped" data
      const historyNumbers = data.history.match(/([\d.]+)/g).map(Number);
      let predicted;
      if (historyNumbers.length > 0) {
        // Example prediction: weighted average, or just max for demo
        predicted = (historyNumbers.reduce((a,b) => a+b, 0) / historyNumbers.length).toFixed(2) + "x";
      } else {
        // Fallback if no numbers found
        predicted = "1.00x";
      }
      document.getElementById('prediction-result').textContent = `Predicted Crash Value: ${predicted}`;
      document.getElementById('predict-btn').disabled = false;
    }, 1000);
  };

  // Back button logic
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.onclick = () => {
      window.location.href = 'index.html';
    };
  }
}