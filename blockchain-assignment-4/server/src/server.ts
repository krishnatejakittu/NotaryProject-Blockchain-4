import { Gateway, Wallets, Wallet, Network, Contract } from "fabric-network";
import * as path from "path";
import * as fs from "fs";
import express from "express";
import { nanoid } from "nanoid";
import multer from "multer";
import ipfs from "./ipfs";

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: function (_req, _file, cb) {
        cb(null, Date.now() + ".pdf");
    },
});

const upload = multer({ storage: storage });

const app = express();
let contract: Contract | null = null;

app.use(express.json());

app.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(500).json({
            message: "Id not found",
            success: "error",
        });
        return;
    }

    if (!contract) {
        res.status(500).json({
            message: "Contract not found",
            success: "error",
        });
        return;
    }

    try {
        const result = await contract.evaluateTransaction(
            "readAgreementB00880866",
            id
        );

        res.status(200).json({
            result: JSON.parse(result.toString()),
            status: "success",
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: "error",
        });
    }
});

app.post("/", upload.single("file"), async (req, res) => {
    const { notary } = req.body as { message: string; notary: string };
    if (!req.file || !req.file.path) {
        res.status(400).json({
            message: "agreement file is required",
            status: "error",
        });
        return;
    }
    if (!notary || !notary.trim().length) {
        res.status(400).json({
            message: "notary is required",
            status: "error",
        });
        return;
    }
    if (!contract) {
        res.status(500).json({
            message: "Contract not found",
            success: "error",
        });
        return;
    }
    const buffer = fs.readFileSync(req.file.path);
    ipfs.files.add(buffer, async (error: Error, result: any) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                message: error.message,
                status: "error",
            });
            return;
        }
        fs.unlinkSync(req.file!.path);

        const id = nanoid(10);
        try {
            await contract!.submitTransaction(
                "createAgreementB00880866",
                id,
                result[0].hash,
                notary
            );
            res.status(201).json({
                message: "Agreement " + id + " was successfully created!",
                success: "success",
                hash: result[0].hash,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
                status: "error",
            });
        }
    });
});

app.patch("/approve/:id", async (req, res) => {
    const id = req.params.id;

    const { senderType, sender } = req.body;

    if (!id) {
        res.status(500).json({
            message: "Id not found",
            success: "error",
        });
        return;
    }
    if (!senderType || !senderType.trim().length) {
        res.status(400).json({
            message: "senderType is required",
            status: "error",
        });
        return;
    }
    if (!sender || !sender.trim().length) {
        res.status(400).json({
            message: "sender is required",
            status: "error",
        });
        return;
    }

    if (!contract) {
        res.status(500).json({
            message: "Contract not found",
            success: "error",
        });
        return;
    }

    try {
        await contract.evaluateTransaction(
            "approvedAgreement",
            id,
            senderType,
            sender
        );
        res.status(200).json({
            message: "Agreement Approved",
            status: true,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: "error",
        });
    }
});

app.patch("/decline/:id", async (req, res) => {
    const id = req.params.id;

    const { senderType, sender } = req.body;

    if (!id) {
        res.status(500).json({
            message: "Id not found",
            success: "error",
        });
        return;
    }
    if (!senderType || !senderType.trim().length) {
        res.status(400).json({
            message: "senderType is required",
            status: "error",
        });
        return;
    }
    if (!sender || !sender.trim().length) {
        res.status(400).json({
            message: "sender is required",
            status: "error",
        });
        return;
    }

    if (!contract) {
        res.status(500).json({
            message: "Contract not found",
            success: "error",
        });
        return;
    }

    try {
        await contract.evaluateTransaction(
            "declineAgreement",
            id,
            senderType,
            sender
        );
        res.status(200).json({
            message: "Agreement Declined",
            status: true,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: "error",
        });
    }
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(500).json({
            message: "Id not found",
            success: "error",
        });
        return;
    }

    if (!contract) {
        res.status(500).json({
            message: "Contract not found",
            success: "error",
        });
        return;
    }

    try {
        await contract.evaluateTransaction("deleteAgreementB00880866", id);

        res.status(200).json({
            message: "Agreement Deleted Successfully",
            status: "success",
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: "error",
        });
    }
});

app.listen(4000, () => {
    console.log("Server Started on port 4000");
    main();
});

async function main(): Promise<void> {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath: string = path.resolve(__dirname, "..", "Org1");
        const wallet: Wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway: Gateway = new Gateway();
        const connectionProfilePath: string = path.resolve(
            __dirname,
            "..",
            "1OrgLocalFabricOrg1GatewayConnection.json"
        );
        const connectionProfile: any = JSON.parse(
            fs.readFileSync(connectionProfilePath, "utf8")
        ); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

        //const connectionOptions: any = { wallet, identity: 'Org1 Admin', discovery: { enabled: true, asLocalhost: true } };
        const connectionOptions: any = {
            wallet,
            identity: "Org1 Admin",
            discovery: { enabled: true, asLocalhost: false },
        };
        await gateway.connect(connectionProfile, connectionOptions);

        // Get the network (channel) our contract is deployed to.
        const network: Network = await gateway.getNetwork("mychannel");

        // Get the contract from the network.
        contract = network.getContract("AgreementB00880866");

        // Submit the specified transaction.
        // to run -->  node ./dist/query.js <transactionID>

        // const transactionID = process.argv.slice(2).toString();
        // if (transactionID == "") {
        //     console.log("TransactionID is null");
        //     throw "[missing argument] - $ node ./dist/query.js transactionID";
        // } else {
        //     const result = await contract.evaluateTransaction(
        //         "readAgreementB00880866",
        //         "1"
        //     );
        //     console.log(
        //         "Transaction has been evaluated, result is:" + result.toString()
        //     );
        // }

        // Disconnect from the gateway.
        // gateway.disconnect();
        // process.exit();
    } catch (error) {
        console.error("Failed to submit transaction:", error.message);
        process.exit(1);
    }
}
