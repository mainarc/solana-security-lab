 function scanTokenAccounts(accounts) {
  const findings = [];

  for (const account of accounts) {
    const info = account.account.data.parsed.info;

    if (info.delegate && Number(info.delegatedAmount.amount) > 0) {
      findings.push({
        type: "Token delegate",
        account: account.pubkey.toString(),
        delegate: info.delegate,
        amount: info.delegatedAmount.amount,
        risk: "REVIEW",
        message: "This token account has an active delegate."
      });
    }
  }

  return findings;
}