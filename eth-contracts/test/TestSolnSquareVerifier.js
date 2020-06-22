var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var fs = require('fs');

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    var index;
    let jsonData = fs.readFileSync('test/proof.json'); 
    let data = JSON.parse(jsonData);
    var proof = data['proof'];
    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new("CapstoneProject", "CPT",{from: account_one});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it("should add new solution", async function () {
            //console.log(Number(proof['a']));
            await this.contract.addSolution(proof['a'],proof['b'],proof['c'],data['inputs'], {from: account_one});    
            let a = Number(await this.contract.counter.call());
            assert.equal(a,1);
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("should mint ERC721 token from the solution", async function () {
            
            await this.contract.addSolution(proof['a'],proof['b'],proof['c'],data['inputs'], {from: account_one});
            await this.contract.mintNFT(account_one, 1, 0, {from: account_one});
            let tokenBalance = await this.contract.balanceOf(account_one);
            assert.equal(Number(tokenBalance),1);
        });

    });
})
