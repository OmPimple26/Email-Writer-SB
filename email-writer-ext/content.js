console.log("Email Writer");

function getEmailContent() {
  const selectors = [
    ".h7", // Outlook's email body
    ".a3s.aiL", // Gmail's email body
    ".gmail_quote", // Gmail's quoted email content
    '[role="presentation"]', // Generic role for email content in dialogs
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return "";
}

function findComposeToolbar() {
  const selectors = [
    ".btC", // Outlook's compose toolbar
    ".aDh", // Gmail's compose toolbar
    '[role="toolbar"]', // Generic dialog role for other email clients
    ".gU.Up", // Yahoo Mail's compose toolbar
  ];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null;
}

function createAIButton() {
  const button = document.createElement("button");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }

  console.log("Toolbar found");
  const button = createAIButton();

  button.classList.add("ai-reply-button");

  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;
      const emailContent = getEmailContent();

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const generatedReply = await response.text();

      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]',
      );
      if (composeBox) {
        composeBox.focus();
        composeBox.innerText = generatedReply;

        composeBox.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch (error) {
      console.error("Error generating AI reply:", error);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  let hasComposeElements = false;

  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);

    hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]')),
    );

    // Stop checking once found
    if (hasComposeElements) {
      break;
    }
  }

  if (hasComposeElements) {
    console.log("Compose window detected");
    // Here you can add your logic to interact with the compose window
    setTimeout(injectButton, 500);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
