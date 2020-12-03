async function getAbi(file) {
  const res = await fetch(file);

  if (res.ok) {
    const data = await res.json();

    return data.abi
  }
}

async function getData() {
  const abi = await getAbi('/contracts/Token.json')

  console.log(abi);
}

getData();