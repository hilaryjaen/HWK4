/*
  Name: Hilary Jaen
  Assignment: HW4 Part 1
  Help and Sources:
  -Course assignment handouts and class slides
  -jQuery: https://code.jquery.com/
  -jQuery Validation Plugin: https://jqueryvalidation.org/
*/
// const to save the table area
const tableArea = document.getElementById("tableArea");

$.validator.addMethod("validNumber", function(value, element) {
  if (!/^-?\d+$/.test(value)) {
    return false;
  }
  const numberValue = Number(value);
  return numberValue >= -50 && numberValue <= 50;
}, "Please enter a whole number between -50 and 50.");

// Start form validation
$("#tableForm").validate({
  rules: {
    minCol: {
      required: true,
      validNumber: true
    },
    maxCol: {
      required: true,
      validNumber: true
    },
    minRow: {
      required: true,
      validNumber: true
    },
    maxRow: {
      required: true,
      validNumber: true
    }
  },
  //validation messages
  messages: {
    minCol: {
      required: "Please enter the minimum column value."
    },
    maxCol: {
      required: "Please enter the maximum column value."
    },
    minRow: {
      required: "Please enter the minimum row value."
    },
    maxRow: {
      required: "Please enter the maximum row value."
    }
  },
    // error placemnent
  errorPlacement: function(error, element) {
    error.insertAfter(element);
  },

  submitHandler: function() {
    let minCol = Number($("#minCol").val());
    let maxCol = Number($("#maxCol").val());
    let minRow = Number($("#minRow").val());
    let maxRow = Number($("#maxRow").val());

    // If the column values are reversed, swap them
    if (minCol > maxCol) {
      let temp = minCol;
      minCol = maxCol;
      maxCol = temp;
    }

    // If the row values are reversed, swap them
    if (minRow > maxRow) {
      let temp = minRow;
      minRow = maxRow;
      maxRow = temp;
    }

    createTable(minCol, maxCol, minRow, maxRow);
  }
});

// Create the multiplication table
function createTable(minCol, maxCol, minRow, maxRow) {
  // removes the old table before making a new one
  tableArea.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "tableWrapper";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Creates the empty top left corner cell
  const topLeftCell = document.createElement("th");
  topLeftCell.textContent = "";
  headerRow.appendChild(topLeftCell);
  // Creates the top row headers
  for (let col = minCol; col <= maxCol; col++) {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");

  // Creates each row of the table
  for (let row = minRow; row <= maxRow; row++) {
    const tr = document.createElement("tr");
    // Creates the left side row header
    const rowHeader = document.createElement("th");
    rowHeader.textContent = row;
    tr.appendChild(rowHeader);
    // Creates the multiplication cells
    for (let col = minCol; col <= maxCol; col++) {
      const td = document.createElement("td");
      td.textContent = row * col;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  wrapper.appendChild(table);
  tableArea.appendChild(wrapper);
}