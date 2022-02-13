async function main() {
    // We get the contract to deploy
    console.log("1");
    const Safe = await ethers.getContractFactory("Safe");
    console.log("2");
    const accounts = ["0x306922793902A8B7da51aC25FFb9CB93a47888Ce",
        "0x350f0AA474cb6aB7b2ffd066C9A2237A63e4DFFa",
        "0xd272AdC76C69Bc406Ed27B262b37EdBC558e1A3F",
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "0xEAa5De3c9A8faE192Ba2B11125C3feC129156Ff8"];
    const min_signers = 2;
    const safe = await Safe.deploy(2,accounts,100);
    console.log("Safe deployed to:", safe.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });