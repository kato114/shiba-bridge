let columns = {
  uid: "uid",
  fToken: "Token",
  fChainID: "From Chain",
  tChainID: "To Chain",
  fAddress: "From Address",
  tAddress: "To Address",
  value: "Value",
  status: "Status",
};

$(document).ready(async () => {
  let chainList = {};
  let tokenList = {};
  await $.get(conf.base_url + "conf/chain", function (data) {
    chainList = JSON.parse(data);
  });
  await $.get(conf.base_url + "conf/token", function (data) {
    let tokens = JSON.parse(data);
    let chainKeyList = Object.keys(chainList);
    let tokenKeyList = Object.keys(tokens);
    for (let i = 0; i < chainKeyList.length; i++) {
      let chainTokenList = {};
      for (let j = 0; j < tokenKeyList.length; j++) {
        chainTokenList[tokens[tokenKeyList[j]][chainKeyList[i]]] =
          tokenKeyList[j];
      }
      tokenList[chainKeyList[i]] = chainTokenList;
    }
    $("#dashboard-chain-count").text(chainKeyList.length);
    $("#dashboard-token-count").text(tokenKeyList.length);
  });

  $.get(conf.base_url + "history", function (data) {
    let history_data = JSON.parse(data).data;
    $("#dashboard-transaction-count").text(history_data.length);
    let final_data = [];
    for (let i = 0; i < history_data.length; i++) {
      final_data.push({
        uid: history_data[i].uid,
        fChainID:
          '<a href="' +
          chainList[history_data[i].fChainID]["scanUrl"] +
          "tx/" +
          history_data[i].fTxnID +
          '" target="_blank">' +
          chainList[history_data[i].fChainID]["name"] +
          "</a>",
        tChainID:
          history_data[i].tTxnID == null
            ? ""
            : '<a href="' +
              chainList[history_data[i].tChainID]["scanUrl"] +
              "tx/" +
              history_data[i].tTxnID +
              '" target="_blank">' +
              chainList[history_data[i].tChainID]["name"] +
              "</a>",
        fToken:
          history_data[i].fToken == null
            ? ""
            : '<a href="' +
              chainList[history_data[i].fChainID]["scanUrl"] +
              "address/" +
              history_data[i].fToken +
              '" target="_blank">' +
              tokenList[history_data[i].fChainID][history_data[i].fToken] +
              "</a>",
        fAddress:
          '<a href="' +
          chainList[history_data[i].fChainID]["scanUrl"] +
          "address/" +
          history_data[i].fAddress +
          '" target="_blank">' +
          history_data[i].fAddress.slice(0, 5) +
          "..." +
          history_data[i].fAddress.slice(-3) +
          "</a>",
        tAddress:
          '<a href="' +
          chainList[history_data[i].tChainID]["scanUrl"] +
          "address/" +
          history_data[i].tAddress +
          '" target="_blank">' +
          history_data[i].tAddress.slice(0, 5) +
          "..." +
          history_data[i].tAddress.slice(-3) +
          "</a>",
        value: history_data[i].amount / 10 ** 18,
        status:
          history_data[i].status == 0
            ? '<span class="badge badge-danger">Failed</span>'
            : '<span class="badge badge-success">Success</span>',
      });
    }

    let table = $("#history_root").tableSortable({
      data: final_data,
      columns: columns,
      searchField: "#searchField",
      rowsPerPage: 10,
      pagination: true,
      tableWillMount: function () {},
      tableDidMount: function () {},
      tableWillUpdate: function () {},
      tableDidUpdate: function () {},
      tableWillUnmount: function () {},
      tableDidUnmount: function () {},
      onPaginationChange: function (nextPage, setPage) {
        setPage(nextPage);
      },
    });

    $("#changeRows").on("change", function () {
      table.updateRowsPerPage(parseInt($(this).val(), 10));
    });
  });
});
