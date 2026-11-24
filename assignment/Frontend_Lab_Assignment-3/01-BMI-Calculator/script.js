function calculateBMI() {
  const height = Number(document.getElementById("height").value) / 100;
  const weight = Number(document.getElementById("weight").value);
  const result = document.getElementById("result");

  if (height <= 0 || weight <= 0) {
    result.textContent = "Please enter a valid height and weight.";
    return;
  }

  const bmi = weight / (height * height);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else category = "Overweight";

  result.textContent = "Your BMI is " + bmi.toFixed(1) + " — " + category;
}
