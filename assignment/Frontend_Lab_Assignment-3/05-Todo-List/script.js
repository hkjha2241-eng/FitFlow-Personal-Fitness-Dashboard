function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const item = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    item.classList.toggle("completed", checkbox.checked);
  });

  const text = document.createElement("span");
  text.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", function () {
    item.remove();
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(deleteButton);
  document.getElementById("taskList").appendChild(item);
  input.value = "";
  input.focus();
}
