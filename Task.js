// jQuery script
$(document).ready(function () {
  // Click event on the attachment element
  $(".attachment").on("click", function () {
    // Get the attachment source from data attribute
    var attachmentSrc = $(this).data("src");

    // Set the source of the modal image
    $("#modalImage").attr("src", attachmentSrc);

    // Show the modal
    $("#attachmentModal").fadeIn();
  });

  // Click event on the close button
  $("#closeModal").on("click", function () {
    // Hide the modal
    $("#attachmentModal").fadeOut();
  });
});

///file upload list show

document.addEventListener("DOMContentLoaded", function () {
  // Get the file input element
  var fileInput = document.getElementById("fileInput");

  // Event listener for file input changes
  fileInput.addEventListener("change", function () {
    // Get the file list
    var files = fileInput.files;

    // Get the file list container
    var fileList = document.getElementById("fileList");

    // Clear previous file list items
    fileList.innerHTML = "";

    // Loop through each selected file
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Create a list item for each file
      var listItem = document.createElement("li");
      listItem.className = "fileItem";

      // Display the original file name and extension
      listItem.textContent =
        file.name + " (" + getFileExtension(file.name) + ")";

      // Append the list item to the file list
      fileList.appendChild(listItem);
    }
  });

  // Function to get the file extension
  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  }
});

var listCount = document.getElementById("attachmentCount");
var count = 0;

listCount.innerHTML =
  document.getElementsByClassName("fileItem").length + count;

//file upload and save click then show count
document.getElementById("save").addEventListener("click", function () {
  count = count + document.getElementsByClassName("fileItem").length;
  listCount.innerHTML = count;
  var fileInput = document.getElementById("fileInput");
  var files = fileInput.files;

  var formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }
  fetch("http://localhost:5000/api/v1/uploadfile", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File upload response:", data);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
});
