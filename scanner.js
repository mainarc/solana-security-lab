 const DANGEROUS_INSTRUCTIONS = [
  "approve",
  "setAuthority",
  "transfer",
  "transferChecked",
  "closeAccount"
]; 

function scanTransaction(transaction) {
  const findings = [];

  for (const instruction of transaction.instructions || []) {
    const name = instruction.name || "unknown";

    if (DANGEROUS_INSTRUCTIONS.includes(name)) {
      findings.push({
        instruction: name,
        risk: "REVIEW",
        message: `Inspect this instruction: ${name}`
      });
    }
  }

  return {
    safe: findings.length === 0,
    findings
  };
}

// Example test
const testTransaction = {
  instructions: [
    { name: "approve" },
    { name: "transfer" }
  ]
};

console.log(scanTransaction(testTransaction));