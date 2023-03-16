$(document).ready(async () => {
  let chainList = {};
  let tokenList = {};
  let orgtokenList = {};
  let targetAmountTag = null;
  await $.get(conf.base_url + "conf/chain", function (data) {
    chainList = JSON.parse(data);
  });
  await $.get(conf.base_url + "conf/token", function (data) {
    tokenList = JSON.parse(data);
  });

  let tokenKeyList = Object.keys(tokenList);
  let chainKeyList = Object.keys(chainList);

  const initPoolData = async () => {
    showSpinner();

    for (let i = 0; i < tokenKeyList.length; i++) {
      let accHTML =
        '<li><div class="bg-dark text-white">' +
        tokenKeyList[i] +
        '</div><table class="table table-responsible bg-dark text-white p-0 mb-0">';
      accHTML +=
        "<tr>" +
        '<td width="20%">Chain</td>' +
        '<td width="40%">Token Address</td>' +
        '<td width="15%" class="text-right">Deposited Amount</td>' +
        '<td width="15%" class="text-right">Failed Swap Amount</td>' +
        '<td width="10%" class="text-right justify-content-left">Deposit</td>' +
        "</tr>";

      for (let j = 0; j < chainKeyList.length; j++) {
        let missedData;
        await $.get(
          conf.base_url +
            "history/missed/" +
            chainKeyList[j] +
            "/" +
            tokenList[tokenKeyList[i]][chainKeyList[j]],
          function (data) {
            missedData = JSON.parse(data);
          }
        );

        let pAmounts = await getPoolAmounts(
          chainKeyList[j],
          tokenList[tokenKeyList[i]][chainKeyList[j]],
          missedData.data
        );
        accHTML +=
          "<tr>" +
          "<td>" +
          chainList[chainKeyList[j]]["name"] +
          "</td>" +
          "<td>" +
          '<a href="' +
          chainList[chainKeyList[j]]["scanUrl"] +
          "address/" +
          tokenList[tokenKeyList[i]][chainKeyList[j]] +
          '" target="_blank">' +
          tokenList[tokenKeyList[i]][chainKeyList[j]] +
          "</a></td>" +
          '<td class="text-right">' +
          pAmounts[0] +
          "</td>" +
          '<td class="text-right">' +
          pAmounts[1] +
          "</td>" +
          '<td class="text-right justify-content-left">' +
          '<button class="btn btn-sm btn-success" data-chainid="' +
          chainKeyList[j] +
          '" data-otoken="' +
          tokenList[tokenKeyList[i]][chainKeyList[j]] +
          '">Deposit</button></td>' +
          "</tr>";
      }
      accHTML += "</table></li>";
      $("#pool-list").append(accHTML);
    }

    jQuery(document).ready(function ($) {
      $("#pool-list").accordionjs();
    });

    hideSpinner();
  };

  const getPoolAmounts = async (chainId, oTokenAddress, missedAmount) => {
    const web3 = new Web3(chainList[chainId]["rpcUrl"]);
    let oTokenContract = new web3.eth.Contract(oTokenABI, oTokenAddress);
    let orgTokenAddress = null;
    let orgTokenDecimal = 0;
    let depositedAmount = 0;

    await oTokenContract.methods
      .getOrgToken()
      .call()
      .then(async (tokenAddress) => {
        orgTokenAddress = tokenAddress;
      });

    let tokenContract = new web3.eth.Contract(ERC20ABI, orgTokenAddress);
    await tokenContract.methods
      .balanceOf(oTokenAddress)
      .call()
      .then((balance) => {
        depositedAmount = balance;
      });
    await tokenContract.methods
      .decimals()
      .call()
      .then((decimals) => {
        orgTokenDecimal = decimals;
      });

    orgtokenList[oTokenAddress] = {
      address: orgTokenAddress,
      decimal: orgTokenDecimal,
    };

    return [
      depositedAmount / 10 ** orgTokenDecimal,
      missedAmount.length > 0
        ? missedAmount[0]["amount"] / 10 ** orgTokenDecimal
        : 0,
    ];
  };

  const depositFund = async (chainId, oTokenAddress) => {
    let currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (currentChainId != chainId) {
      showToast("Switch Network", "error");
      return;
    }

    $("#pool-address").val(oTokenAddress);
    $("#pool-token-address").val(orgtokenList[oTokenAddress].address);
    $("#pool-token-amount").val(0);

    $("#exampleModal").modal();
  };

  $("#pool-list").delegate("button", "click", (e) => {
    depositFund($(e.target).data("chainid"), $(e.target).data("otoken"));
    targetAmountTag = $(e.target).parent().parent().children()[2];
  });

  $("#pool-deposit").on("click", async (e) => {
    showSpinner();
    let tokenContract = new window.web3.eth.Contract(
      ERC20ABI,
      $("#pool-token-address").val()
    );

    await tokenContract.methods
      .transfer(
        $("#pool-address").val(),
        (
          $("#pool-token-amount").val() *
          10 ** orgtokenList[$("#pool-address").val()].decimal
        ).toString()
      )
      .send(
        {
          from: account[0],
        },
        function (res) {
          if (res != null) hideSpinner();
        }
      )
      .then(async function (res) {
        if (res.status === true) {
          showToast("Deposit Succeed", "success");
          $(targetAmountTag).text(
            Number($("#pool-token-amount").val()) +
              Number($(targetAmountTag).text())
          );
        } else {
          showToast("Deposit Failed", "error");
        }
      });
    $("#exampleModal").modal("hide");
    hideSpinner();
  });

  initPoolData();
});
