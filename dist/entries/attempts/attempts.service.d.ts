import { Connection } from 'mongoose';
import { AttemptDocument, AttemptModel } from './attempt.model';
import { CreateAttemptInterface, GetAllAttemptsInterface, GetAttemptInterface, UpdateResultsPushInterface, EditDateEndInterface, EditIrRelevantInterface } from './attempts.interface';
export declare class AttemptsService {
    protected connection: Connection;
    private attempts;
    constructor(connection: Connection, attempts: AttemptModel);
    createAttempt(payload: CreateAttemptInterface): Promise<AttemptDocument>;
    getAllAttempts(payload: GetAllAttemptsInterface): Promise<Array<AttemptDocument>>;
    getAttempt(payload: GetAttemptInterface): Promise<AttemptDocument>;
    updateResultsPush(payload: UpdateResultsPushInterface): Promise<boolean>;
    editDateEnd(payload: EditDateEndInterface): Promise<AttemptDocument>;
    editIrRelevant(payload: EditIrRelevantInterface): Promise<AttemptDocument>;
}
