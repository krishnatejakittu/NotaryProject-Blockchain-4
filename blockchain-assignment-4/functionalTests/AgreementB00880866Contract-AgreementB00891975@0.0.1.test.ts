/*
 * Use this file for functional testing of your smart contract.
 * Fill out the arguments and return values for a function and
 * use the CodeLens links above the transaction blocks to
 * invoke/submit transactions.
 * All transactions defined in your smart contract are used here
 * to generate tests, including those functions that would
 * normally only be used on instantiate and upgrade operations.
 * This basic test file can also be used as the basis for building
 * further functional tests to run as part of a continuous
 * integration pipeline, or for debugging locally deployed smart
 * contracts by invoking/submitting individual transactions.
 */
/*
 * Generating this test file will also trigger an npm install
 * in the smart contract project directory. This installs any
 * package dependencies, including fabric-network, which are
 * required for this test file to be run locally.
 */

import * as assert from "assert";
import * as fabricNetwork from "fabric-network";
import { SmartContractUtil } from "./ts-smart-contract-util";

import * as os from "os";
import * as path from "path";

describe("AgreementB00880866Contract-AgreementB00880866@0.0.1", () => {
    const homedir: string = os.homedir();
    const walletPath: string = path.join(
        homedir,
        ".fabric-vscode",
        "v2",
        "environments",
        "1 Org Local Fabric",
        "wallets",
        "Org1"
    );
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    let fabricWallet: fabricNetwork.Wallet;
    const identityName: string = "Org1 Admin";
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
        fabricWallet = await fabricNetwork.Wallets.newFileSystemWallet(
            walletPath
        );
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean =
            SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe("agreementB00880866Exists", () => {
        it("should submit agreementB00880866Exists transaction", async () => {
            // TODO: populate transaction parameters
            const assignmentTwoId: string = "EXAMPLE";
            const args: string[] = [assignmentTwoId];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "agreementB00880866Exists",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe("createAgreementB00880866", () => {
        it("should submit createAgreementB00880866 transaction", async () => {
            // TODO: populate transaction parameters
            const agreementId: string = "EXAMPLE";
            const message: string = "EXAMPLE";
            const notary: string = "EXAMPLE";
            const args: string[] = [agreementId, message, notary];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "createAgreementB00880866",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe("readAgreementB00880866", () => {
        it("should submit readAgreementB00880866 transaction", async () => {
            // TODO: populate transaction parameters
            const assignmentTwoId: string = "EXAMPLE";
            const args: string[] = [assignmentTwoId];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "readAgreementB00880866",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe("approvedAgreement", () => {
        it("should submit approvedAgreement transaction", async () => {
            // TODO: populate transaction parameters
            const agreementId: string = "EXAMPLE";
            const senderType: string = "EXAMPLE";
            const sender: string = "EXAMPLE";
            const args: string[] = [agreementId, senderType, sender];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "approvedAgreement",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe("declineAgreement", () => {
        it("should submit declineAgreement transaction", async () => {
            // TODO: populate transaction parameters
            const agreementId: string = "EXAMPLE";
            const senderType: string = "EXAMPLE";
            const sender: string = "EXAMPLE";
            const args: string[] = [agreementId, senderType, sender];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "declineAgreement",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe("deleteAgreementB00880866", () => {
        it("should submit deleteAgreementB00880866 transaction", async () => {
            // TODO: populate transaction parameters
            const assignmentTwoId: string = "EXAMPLE";
            const args: string[] = [assignmentTwoId];
            const response: Buffer = await SmartContractUtil.submitTransaction(
                "AgreementB00880866Contract",
                "deleteAgreementB00880866",
                args,
                gateway
            );

            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });
});
