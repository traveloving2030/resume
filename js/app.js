typeof web3 !== 'undefined'
  ? (web3 = new Web3(web3.currentProvider))
  : (web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')));

if (web3.isConnected()) {
  console.log('connected');
} else {
  console.log('not connected');
  exit;
}

const contractAddress = '0x7D98025bd2aB56A17b35Aed4F461575a48934d5F';
const smartContract = web3.eth.contract(abi).at(contractAddress);


function showDoc() {
  
   const table = document.getElementById('table1');
    const doc_num=document.getElementById('doc_number').value;
    const account = document.getElementById('admin_account').value;

    if ( web3.personal.unlockAccount(account, document.getElementById('admin_pass').value) )
    {
      
      smartContract.getDocStruct(
        doc_num,
        { from: account, gas: 2000000 },
        (err, result) => {
          if (!err) {
            alert('트랜잭션이 성공적으로 전송되었습니다.\n' + result);
            console.log(result);
            const toString = result.toString();
            const strArray = toString.split(',');
           
        
           
           console.log("1nd");
          //  console.log(toString);
          console.log(strArray[4]);
        
            const timestamp = new Date(strArray[3] * 1000);
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            cell1.innerHTML = strArray[0];
            cell2.innerHTML = strArray[1];
            cell3.innerHTML = strArray[2];
            cell4.style.width = '60%';
            cell4.innerHTML = timestamp;
          }
        }
      );
    }
   

}

function addDoc() {
  const docname = document.getElementById('docname').value;
  const author = document.getElementById('author').value;
  const text = document.getElementById('text').value;
  const account = document.getElementById('account').value;
  const pwd=document.getElementById('pass').value;
  if ( web3.personal.unlockAccount(account, pwd))
  {
    smartContract.addDoc(
      docname,
      author,
      text,
      { from: account, gas: 2000000 },
      (err, result) => {
        if (!err) alert('트랜잭션이 성공적으로 전송되었습니다.\n' + result);
      }
    );
  }
}

// $(function() {
//   showList();
// });
