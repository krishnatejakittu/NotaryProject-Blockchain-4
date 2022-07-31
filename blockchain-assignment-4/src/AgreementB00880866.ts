/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from "fabric-contract-api";

export enum StatusType {
    "PENDING",
    "CANCEL",
    "APPROVE",
}

@Object()
export class AgreementB00880866 {
    @Property()
    public hashcode: string;

    @Property()
    public notary: string;

    @Property()
    public seller: string;

    @Property()
    public buyer: string;

    @Property()
    public sellerStatus: StatusType;

    @Property()
    public buyerStatus: StatusType;
}
