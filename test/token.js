const Token = artifacts.require("Token");

contract("Token", accounts => {
  let token;

  beforeEach(async () => {
    token = await Token.deployed();
  });

  it('should include name and symbol', async () => {
    const name = await token.name();
    const symbol = await token.symbol();

    assert.equal(name, "The Best Token");
    assert.equal(symbol, "BEST");
  });

  it('should give accounts[0] all the total supply', async () => {
    const balance = await token.balanceOf(accounts[0]);

    assert.strictEqual(balance.toString(), '10000000');
  })

  it('should transfer 1000 to accounts[1] from accounts[0]', async () => {
    await token.transfer(accounts[1], '1000', { from: accounts[0] });

    const balanceOfZero = await token.balanceOf(accounts[0])
    const balanceOfOne = await token.balanceOf(accounts[1])

    assert.strictEqual(balanceOfZero.toString(), '9999000')
    assert.strictEqual(balanceOfOne.toString(), '1000')
  });

  it('should transfer 1000 to accounts[0] from accounts[1]', async () => {
    try {
      await token.transfer(accounts[0], '1001', { from: accounts[1] });
    } catch (e) {
      assert.match(e.message, /Not enough balance/)
    }
  });

  it('should transfer 1000 to accounts[1] from accounts[0]', async () => {
    await token.approve(accounts[1], '1000', { from: accounts[0] })

    await token.transferFrom(accounts[0], accounts[2], '1000', { from: accounts[1] })

    const balanceOfZero = await token.balanceOf(accounts[0])
    const balanceOfOne = await token.balanceOf(accounts[2])

    assert.strictEqual(balanceOfZero.toString(), '9998000')
    assert.strictEqual(balanceOfOne.toString(), '1000')
  });

  it('should transfer 1000 to accounts[0] from accounts[1]', async () => {
    try {
      await token.approve(accounts[0], '1001', { from: accounts[2] })
      
      await token.transferFrom(accounts[2], accounts[0], '1001', { from: accounts[0] });
    } catch (e) {
      assert.match(e.message, /Not enough balance/)
    }
  });
});
  
