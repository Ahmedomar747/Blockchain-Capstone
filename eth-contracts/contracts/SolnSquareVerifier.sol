pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./ERC721Mintable.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    using SafeMath for uint;
    Verifier verifier = new Verifier();


    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        address owner;
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[2] inputs;
        bool exits;
    }

    uint public counter = 0;

    
    // TODO define an array of the above struct
    Solution[] public solutions;
 
    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bool) uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event solutionAdded(uint index);


    constructor(string memory name, string memory symbol) public ERC721MintableComplete(name, symbol)  {}

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution( uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory inputs) public {
        Solution memory sol = Solution(msg.sender, a, b, c, inputs, true);
        solutions.push(sol);
        emit solutionAdded(counter);
        counter = counter.add(1);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    function mintNFT(address to, uint256 tokenId, uint index) public returns (bool){
        //  - make sure the solution is unique (has not been used before)
        require(solutions[index].owner == msg.sender,"Only solution owner can mint this token.");
        require(!uniqueSolutions[index],"Solution already added");
        require(verifier.verifyTx(solutions[index].a, solutions[index].b, solutions[index].c, solutions[index].inputs),"Invalid proof");
        //  - make sure you handle metadata as well as tokenSupply
        super.mint(to, tokenId);
        uniqueSolutions[index] = true;

        return true;
    }
}




  


























