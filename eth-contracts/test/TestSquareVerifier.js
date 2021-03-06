// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('verifier');
var fs = require('fs');

contract('TestSquareVerifier', accounts => {
    const account_one = accounts[0];
    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new({from: account_one});
        })

        // Test verification with correct proof
        // - use the contents from proof.json generated from zokrates steps
        it("should return true for the real proof", async function () {
            var jsonData = fs.readFileSync('test/proof.json'); 
            var data = JSON.parse(jsonData);
            var proof = data['proof'];
            let bool = await this.contract.verifyTx.call(proof['a'],proof['b'],proof['c'],data['inputs']);
            assert.equal(bool,true);
        });

        // Test verification with incorrect proof
        it("should return false for the tampered proof", async function () {
            var jsonData = fs.readFileSync('test/tamperedProof.json'); 
            var data = JSON.parse(jsonData);
            var proof = data['proof'];
            let bool = await this.contract.verifyTx.call(proof['a'],proof['b'],proof['c'],data['inputs']);
            assert.equal(bool,false);
        });

    });
});