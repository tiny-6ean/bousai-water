document.getElementById("calcBtn").addEventListener("click", () => {

  const weight = parseFloat(document.getElementById("weight").value);
  const age = document.getElementById("age").value;
  const health = document.getElementById("health").value;
  const diet = document.getElementById("diet").value;
  const season = document.getElementById("season").value;

  if (!weight) {
    alert("体重を入力してください");
    return;
  }

  // ① 総水分要求量（中央値）
  let totalWater = 50; // 成猫基準

  if (age === "kitten") totalWater = 62;
  if (age === "senior") totalWater = 62;

  if (health === "ckd") totalWater = 70;
  if (health === "urinary") totalWater = 62;

  // ② 飲むべき水量（食事タイプ）
  let drinkWater = 50; // ドライ中心
  if (diet === "wet") drinkWater = 40;

  // ③ 1日必要水量
  const daily = weight * drinkWater;

  // ④ 72時間
  const threeDays = daily * 3;

  // ⑤ 安全係数
  let safety = 1.3;
  if (health === "ckd") safety = 1.5;
  if (season === "summer") safety *= 1.3;

  const finalAmount = Math.round(threeDays * safety);

  // ペットボトル換算
  const bottles500 = Math.ceil(finalAmount / 500);
  const bottles2L = Math.ceil(finalAmount / 2000);

  // 表示
  document.getElementById("result").innerHTML = `
    <h2>結果</h2>
    <p>1日必要水量：<strong>${daily} ml</strong></p>
    <p>72時間必要水量：<strong>${threeDays} ml</strong></p>
    <p>推奨備蓄量（安全係数込み）：<strong>${finalAmount} ml</strong></p>
    <p>500ml換算：<strong>${bottles500} 本</strong></p>
    <p>2L換算：<strong>${bottles2L} 本</strong></p>
  `;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/bousai-water/service-worker.js");
}

