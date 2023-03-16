let account = null;
let chainId = null;

const init = async () => {
  showPage("connect");
  initialize();
  hideSpinner();
};

const initialize = async () => {
  chainId = await window.ethereum.request({ method: "eth_chainId" });
  account = await window.ethereum.request({ method: "eth_accounts" });

  if (account !== null && account.length > 0) {
    if (account[0].toLowerCase() === conf.admin_wallet.toLowerCase()) {
      window.web3 = new Web3(window.ethereum);

      showPage("main");
      showTab("dashboard", $(".nav-link")[0]);
      showToast("Login succeed!", "success");
    } else {
      showToast("Please connect admin wallet!", "error");
    }
  }
};

const connectWallet = async () => {
  if (
    window.ethereum &&
    window.ethereum.isMetaMask &&
    window.ethereum.isConnected()
  ) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    initialize();
  } else {
    showToast("Please install Metamask!", "error");
  }
};

const showPage = (pageName) => {
  $(".spage").hide();
  $("#page-" + pageName).show();
};

const showTab = (tabName, e) => {
  $(".nav-item").removeClass("active");
  $(e).parent().addClass("active");

  $(".stab").hide();
  $("#tab-" + tabName).show();
};

const showToast = (msg, type) => {
  const bg = {
    success: "#28a745",
    error: "#dc3545",
  };

  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bg[type],
      fontSize: "14px",
    },
  }).showToast();
};

const showSpinner = () => {
  $("#spinner").addClass("active");
};

const hideSpinner = () => {
  $("#spinner").removeClass("active");
};

$(document).ready(() => {
  init();
});
