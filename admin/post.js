window.copyBPlAdminShortcode = function (postID) {
  // Get the input element by ID
  var copyText = document.querySelector('#bPlAdminShortcode-' + postID + ' input');

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  document.execCommand("copy");

  // Optional: Provide feedback to the user, e.g., change the tooltip text
  var tooltip = document.querySelector('#bPlAdminShortcode-' + postID + ' .tooltip');
  tooltip.innerHTML = "Copied Successfully!";
}