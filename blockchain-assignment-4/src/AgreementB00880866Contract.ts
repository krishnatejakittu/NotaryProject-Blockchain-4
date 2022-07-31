/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from "fabric-contract-api";
import { AgreementB00880866, StatusType } from "./AgreementB00880866";

@Info({
    title: "Agreement B00880866",
    description: "Approve Contract With Trust of Blockchain",
})
export class AgreementB00880866Contract extends Contract {
    @Transaction(false)
    @Returns("boolean")
    public async agreementB00880866Exists(
        ctx: Context,
        assignmentTwoId: string
    ): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(assignmentTwoId);
        return !!data && data.length > 0;
    }

    @Transaction()
    public async createAgreementB00880866(
        ctx: Context,
        agreementId: string,
        message: string,
        notary: string
    ): Promise<void> {
        const exists: boolean = await this.agreementB00880866Exists(
            ctx,
            agreementId
        );
        if (exists) {
            throw new Error(`The aggrement ${agreementId} already exists`);
        }
        const agreementB00880866: AgreementB00880866 = new AgreementB00880866();
        agreementB00880866.hashcode = message;
        agreementB00880866.seller = notary;
        agreementB00880866.buyer = notary;
        agreementB00880866.notary = notary;
        agreementB00880866.buyerStatus = StatusType.PENDING;
        agreementB00880866.sellerStatus = StatusType.PENDING;

        const buffer: Buffer = Buffer.from(JSON.stringify(agreementB00880866));
        await ctx.stub.putState(agreementId, buffer);
    }

    @Transaction(false)
    @Returns("AgreementB00880866")
    public async readAgreementB00880866(
        ctx: Context,
        assignmentTwoId: string
    ): Promise<AgreementB00880866> {
        const exists: boolean = await this.agreementB00880866Exists(
            ctx,
            assignmentTwoId
        );
        if (!exists) {
            throw new Error(`The agreement ${assignmentTwoId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(assignmentTwoId);
        const agreementB00880866Data: AgreementB00880866 = JSON.parse(
            data.toString()
        ) as AgreementB00880866;
        return agreementB00880866Data;
    }

    @Transaction()
    public async approvedAgreement(
        ctx: Context,
        agreementId: string,
        senderType: string,
        sender: string
    ): Promise<void> {
        const exists: boolean = await this.agreementB00880866Exists(
            ctx,
            agreementId
        );
        if (!exists) {
            throw new Error(`The agreement two ${agreementId} does not exist`);
        }
        const agreementB00880866: AgreementB00880866 = new AgreementB00880866();
        if (senderType.toLocaleUpperCase() === "SELLER") {
            agreementB00880866.seller = sender;
            agreementB00880866.sellerStatus = StatusType.APPROVE;
        } else if (senderType.toLocaleUpperCase() === "BUYER") {
            agreementB00880866.buyer = sender;
            agreementB00880866.buyerStatus = StatusType.APPROVE;
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(agreementB00880866));
        await ctx.stub.putState(agreementId, buffer);
    }

    @Transaction()
    public async declineAgreement(
        ctx: Context,
        agreementId: string,
        senderType: string,
        sender: string
    ): Promise<void> {
        const exists: boolean = await this.agreementB00880866Exists(
            ctx,
            agreementId
        );
        if (!exists) {
            throw new Error(`The agreement two ${agreementId} does not exist`);
        }
        const agreementB00880866: AgreementB00880866 = new AgreementB00880866();
        if (senderType.toLocaleUpperCase() === "SELLER") {
            agreementB00880866.seller = sender;
            agreementB00880866.sellerStatus = StatusType.CANCEL;
        } else if (senderType.toLocaleUpperCase() === "BUYER") {
            agreementB00880866.buyer = sender;
            agreementB00880866.buyerStatus = StatusType.CANCEL;
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(agreementB00880866));
        await ctx.stub.putState(agreementId, buffer);
    }

    @Transaction()
    public async deleteAgreementB00880866(
        ctx: Context,
        assignmentTwoId: string
    ): Promise<void> {
        const exists: boolean = await this.agreementB00880866Exists(
            ctx,
            assignmentTwoId
        );
        if (!exists) {
            throw new Error(
                `The agreement two ${assignmentTwoId} does not exist`
            );
        }
        await ctx.stub.deleteState(assignmentTwoId);
    }
}
