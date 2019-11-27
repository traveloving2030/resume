pragma solidity ^0.4.26;

contract Resume {
    
    uint8 numberOfDocs; // 총 제품의 수입니다.
    address admin;

    struct myDoc {
        string text;
        string docName;
        string author;
        uint timestamp;
    }

    constructor(){
        admin=msg.sender;
    }

    event createDoc (
        string text,
        string docName,
        string author,
        uint timestamp
    );

    myDoc[] public doc_array;

    function addDoc(string memory DocText, string memory DocName, string memory AuthorName) public {
        doc_array.push(myDoc(DocText, DocName, AuthorName, block.timestamp)) -1;
        numberOfDocs++;
        emit createDoc(DocText, DocName, AuthorName, block.timestamp);
    }

    //제품 등록의 수를 리턴합니다.
    function getNumOfDocs() public view returns(uint8) {
        return numberOfDocs;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getDocStruct(uint _index) public restricted view returns (string memory, string memory, string memory, uint)  {
        return (doc_array[_index].text, doc_array[_index].docName, doc_array[_index].author, doc_array[_index].timestamp);
    }

    modifier restricted(){
        require(msg.sender==admin);
        _;
    }
}